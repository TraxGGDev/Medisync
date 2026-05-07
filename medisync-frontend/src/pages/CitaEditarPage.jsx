import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCitaById } from '../services/citasService'
import { CitaForm } from '../components/citas/CitaForm'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export function CitaEditarPage() {
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

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 text-sm underline">
          Volver
        </button>
      </div>
    )
  }

  return (
    <CitaForm
      cita={cita}
      onSuccess={() => navigate(`/citas/${id}`)}
      onCancel={() => navigate(`/citas/${id}`)}
    />
  )
}
