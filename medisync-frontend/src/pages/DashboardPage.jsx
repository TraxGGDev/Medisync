import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCitas } from '../hooks/useCitas'
import { CitaTable } from '../components/citas/CitaTable'

export function DashboardPage() {
  const { data, loading, error, cargar } = useCitas()
  const navigate = useNavigate()

  // Obtener fecha de hoy en formato ISO YYYY-MM-DD — estable durante el ciclo de vida
  const hoy = useMemo(() => new Date().toISOString().substring(0, 10), [])

  useEffect(() => {
    cargar({ fecha: hoy })
  }, [cargar, hoy])

  // Formatear fecha para mostrar en el encabezado
  const fechaFormateada = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda del Día</h1>
          <p className="text-sm text-gray-500 mt-1 capitalize">{fechaFormateada}</p>
        </div>
        <button
          onClick={() => navigate('/citas/nueva')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nueva Cita
        </button>
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button
            onClick={() => cargar({ fecha: hoy })}
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
          emptyMessage="No hay citas programadas para hoy."
        />
      )}
    </div>
  )
}
