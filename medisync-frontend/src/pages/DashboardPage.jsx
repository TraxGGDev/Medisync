import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCitas } from '../hooks/useCitas'
import { CitaTable } from '../components/citas/CitaTable'

export function DashboardPage() {
  const { data, loading, error, cargar } = useCitas()
  const navigate = useNavigate()

  const hoy = useMemo(() => new Date().toISOString().substring(0, 10), [])
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy)

  useEffect(() => {
    cargar({ fecha: fechaSeleccionada })
  }, [cargar, fechaSeleccionada])

  const fechaFormateada = new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Citas del Día</h1>
          <p className="text-sm text-gray-500 mt-1 capitalize">{fechaFormateada}</p>
        </div>
        <button
          onClick={() => navigate('/citas/nueva')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nueva Cita
        </button>
      </div>

      {/* Filtro por fecha */}
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Fecha:</label>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {fechaSeleccionada !== hoy && (
          <button
            onClick={() => setFechaSeleccionada(hoy)}
            className="text-xs text-blue-600 hover:underline"
          >
            Volver a hoy
          </button>
        )}
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button
            onClick={() => cargar({ fecha: fechaSeleccionada })}
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <CitaTable
          citas={data}
          loading={loading}
          onRowClick={(id) => navigate(`/citas/${id}`)}
          emptyMessage="No hay citas para esta fecha."
        />
      )}
    </div>
  )
}
