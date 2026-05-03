import { useEffect } from 'react'
import { useDoctores } from '../hooks/useDoctores'
import { DoctorTable } from '../components/doctores/DoctorTable'

export function DoctoresPage() {
  const { data, loading, error, cargar } = useDoctores()

  useEffect(() => {
    cargar()
  }, [cargar])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Médicos</h1>

      {error ? (
        <div className="text-center py-8">
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button
            onClick={cargar}
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <DoctorTable doctores={data} loading={loading} />
      )}
    </div>
  )
}
