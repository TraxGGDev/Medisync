import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { getCitasPaciente } from '../services/pacientesService'
import { CitaTable } from '../components/citas/CitaTable'

export function MisCitasPage() {
  const { usuarioActivo, cerrarSesionActiva } = useAppContext()
  const navigate = useNavigate()
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!usuarioActivo?.pacienteId) {
      setError('No se encontró tu número de paciente. Contacta a la clínica.')
      setLoading(false)
      return
    }

    getCitasPaciente(usuarioActivo.pacienteId)
      .then(setCitas)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [usuarioActivo])

  const handleLogout = () => {
    cerrarSesionActiva()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <span className="text-xl font-bold text-blue-700">MediSync</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
              {usuarioActivo?.nombre?.charAt(0).toUpperCase() || 'P'}
            </div>
            <span className="text-sm font-medium text-gray-700">{usuarioActivo?.nombre}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-red-600 border border-gray-200 px-2 py-1 rounded transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mis Citas</h1>
          <p className="text-sm text-gray-500 mt-1">Historial de tus citas médicas</p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        ) : (
          <CitaTable
            citas={citas}
            loading={loading}
            onRowClick={(id) => navigate(`/mis-citas/${id}`)}
            emptyMessage="No tienes citas registradas."
            mostrarFechaCreacion
          />
        )}
      </main>
    </div>
  )
}
