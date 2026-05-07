import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCitaById, cancelarCita } from '../services/citasService'
import { CitaDetalle } from '../components/citas/CitaDetalle'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export function CitaDetallePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cita, setCita] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCitaById(id)
      .then(setCita)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleCancelConfirm = async (citaId) => {
    try {
      const citaActualizada = await cancelarCita(citaId)
      setCita(citaActualizada)
    } catch (err) {
      alert(`Error al cancelar: ${err.message}`)
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 text-sm underline hover:text-blue-800"
        >
          Volver a la agenda
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        ← Volver
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detalle de Cita #{id}</h1>
      <CitaDetalle cita={cita} onCancelConfirm={handleCancelConfirm} />
    </div>
  )
}
