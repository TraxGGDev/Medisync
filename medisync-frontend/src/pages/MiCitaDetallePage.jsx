import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { getCitaById } from '../services/citasService'
import { StatusBadge } from '../components/ui/StatusBadge'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { formatFecha, formatHora } from '../lib/utils'

export function MiCitaDetallePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cerrarSesionActiva, usuarioActivo } = useAppContext()
  const [cita, setCita] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCitaById(id)
      .then(setCita)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

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

      <main className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => navigate('/mis-citas')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Volver a mis citas
        </button>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate('/mis-citas')}
              className="text-blue-600 text-sm underline"
            >
              Volver
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Detalle de Cita</h1>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              {/* Estado */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Estado:</span>
                <StatusBadge estado={cita.estado} />
              </div>

              {/* Doctor */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Doctor</h3>
                <dl className="space-y-2">
                  <div className="flex gap-4">
                    <dt className="text-sm text-gray-500 w-32">Nombre</dt>
                    <dd className="text-sm font-medium text-gray-900">{cita.doctor?.nombre}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm text-gray-500 w-32">Especialidad</dt>
                    <dd className="text-sm text-gray-700">{cita.doctor?.especialidad}</dd>
                  </div>
                </dl>
              </div>

              {/* Cita */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Información de la cita</h3>
                <dl className="space-y-2">
                  <div className="flex gap-4">
                    <dt className="text-sm text-gray-500 w-32">Fecha</dt>
                    <dd className="text-sm text-gray-700">{formatFecha(cita.fecha)}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm text-gray-500 w-32">Hora inicio</dt>
                    <dd className="text-sm text-gray-700">{formatHora(cita.hora_inicio)}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm text-gray-500 w-32">Hora fin</dt>
                    <dd className="text-sm text-gray-700">{formatHora(cita.hora_fin)}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-sm text-gray-500 w-32">Motivo</dt>
                    <dd className="text-sm text-gray-700">{cita.motivo}</dd>
                  </div>
                  {cita.fecha_creacion && (
                    <div className="flex gap-4">
                      <dt className="text-sm text-gray-500 w-32">Registrada</dt>
                      <dd className="text-sm text-gray-700">{formatFecha(cita.fecha_creacion)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
            {/* Sin botones de acción — solo lectura */}
          </>
        )}
      </main>
    </div>
  )
}
