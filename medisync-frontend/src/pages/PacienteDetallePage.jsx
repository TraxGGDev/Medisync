import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPacienteById, getCitasPaciente, updatePaciente } from '../services/pacientesService'
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

  // Estado del formulario de edición
  const [editando, setEditando] = useState(false)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [errorEdicion, setErrorEdicion] = useState(null)

  useEffect(() => {
    getPacienteById(id)
      .then((p) => {
        setPaciente(p)
        setNombre(p.nombre)
        setTelefono(p.telefono)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingPaciente(false))

    getCitasPaciente(id)
      .then(setCitas)
      .catch(() => setCitas([]))
      .finally(() => setLoadingCitas(false))
  }, [id])

  const handleGuardar = async (e) => {
    e.preventDefault()
    setGuardando(true)
    setErrorEdicion(null)
    try {
      const actualizado = await updatePaciente(id, { nombre, telefono })
      setPaciente(actualizado)
      setEditando(false)
    } catch (err) {
      setErrorEdicion(err.message || 'Error al guardar los cambios')
    } finally {
      setGuardando(false)
    }
  }

  const handleCancelarEdicion = () => {
    setNombre(paciente.nombre)
    setTelefono(paciente.telefono)
    setErrorEdicion(null)
    setEditando(false)
  }

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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{paciente?.nombre}</h1>
          {!editando && (
            <button
              onClick={() => setEditando(true)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        {editando ? (
          <form onSubmit={handleGuardar} className="space-y-4">
            {errorEdicion && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                {errorEdicion}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelarEdicion}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {guardando ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        ) : (
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
        )}
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
