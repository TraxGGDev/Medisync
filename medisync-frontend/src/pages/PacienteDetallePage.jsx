import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPacienteById, getCitasPaciente } from '../services/pacientesService'
import { CitaTable } from '../components/citas/CitaTable'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export function PacienteDetallePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [paciente, setPaciente] = useState(null)
  const [citas, setCitas] = useState([])
  const [loadingPaciente, setLoadingPaciente] = useState(true)
  const [loadingCitas, setLoadingCitas] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPacienteById(id)
      .then(setPaciente)
      .catch((err) => setError(err.message))
      .finally(() => setLoadingPaciente(false))

    getCitasPaciente(id)
      .then(setCitas)
      .catch(() => setCitas([]))
      .finally(() => setLoadingCitas(false))
  }, [id])

  if (loadingPaciente) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button
          onClick={() => navigate('/pacientes')}
          className="text-blue-600 text-sm underline hover:text-blue-800"
        >
          Volver a pacientes
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/pacientes')}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        ← Volver
      </button>

      {/* Datos del paciente */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{paciente?.nombre}</h1>
        <dl className="space-y-2">
          <div className="flex gap-4">
            <dt className="text-sm text-gray-500 w-32">Teléfono</dt>
            <dd className="text-sm text-gray-700">{paciente?.telefono}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="text-sm text-gray-500 w-32">N° Seguro</dt>
            <dd className="text-sm text-gray-700">{paciente?.numero_seguro}</dd>
          </div>
        </dl>
      </div>

      {/* Historial de citas */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Historial de Citas</h2>
      <CitaTable
        citas={citas}
        loading={loadingCitas}
        onRowClick={(citaId) => navigate(`/citas/${citaId}`)}
        emptyMessage="Este paciente no tiene citas registradas."
      />
    </div>
  )
}
