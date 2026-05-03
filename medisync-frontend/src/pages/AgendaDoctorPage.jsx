import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDoctores } from '../hooks/useDoctores'
import { getCitas } from '../services/citasService'
import { CitaTable } from '../components/citas/CitaTable'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export function AgendaDoctorPage() {
  const { data: doctores, loading: loadingDoctores, cargar: cargarDoctores } = useDoctores()
  const navigate = useNavigate()

  const hoy = new Date().toISOString().substring(0, 10)
  const [doctorId, setDoctorId] = useState('')
  const [fecha, setFecha] = useState(hoy)
  const [citas, setCitas] = useState([])
  const [loadingCitas, setLoadingCitas] = useState(false)
  const [errorCitas, setErrorCitas] = useState(null)

  useEffect(() => {
    cargarDoctores()
  }, [cargarDoctores])

  useEffect(() => {
    if (!doctorId) return
    setLoadingCitas(true)
    setErrorCitas(null)
    getCitas({ doctor_id: doctorId, fecha })
      .then(setCitas)
      .catch((err) => setErrorCitas(err.message))
      .finally(() => setLoadingCitas(false))
  }, [doctorId, fecha])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi Agenda</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Selector de doctor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
          {loadingDoctores ? (
            <LoadingSpinner />
          ) : (
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[240px]"
            >
              <option value="">Seleccionar doctor...</option>
              {doctores.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre} — {d.especialidad}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Selector de fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {!doctorId ? (
        <p className="text-sm text-gray-500">Selecciona un doctor para ver su agenda.</p>
      ) : errorCitas ? (
        <div className="text-center py-8">
          <p className="text-red-600 text-sm mb-3">{errorCitas}</p>
          <button
            onClick={() => {
              setLoadingCitas(true)
              getCitas({ doctor_id: doctorId, fecha })
                .then(setCitas)
                .catch((err) => setErrorCitas(err.message))
                .finally(() => setLoadingCitas(false))
            }}
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <CitaTable
          citas={citas}
          loading={loadingCitas}
          onRowClick={(id) => navigate(`/citas/${id}`)}
          emptyMessage="No hay citas para este doctor en la fecha seleccionada."
        />
      )}
    </div>
  )
}
