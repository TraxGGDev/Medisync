import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePacientes } from '../hooks/usePacientes'
import { PacienteTable } from '../components/pacientes/PacienteTable'
import { filtrarPacientes } from '../lib/utils'

export function PacientesListPage() {
  const { data, loading, error, cargar } = usePacientes()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    cargar()
  }, [cargar])

  const pacientesFiltrados = filtrarPacientes(data, query)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
        <button
          onClick={() => navigate('/pacientes/nuevo')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nuevo Paciente
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o teléfono..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
        <PacienteTable
          pacientes={pacientesFiltrados}
          loading={loading}
          onRowClick={(id) => navigate(`/pacientes/${id}`)}
        />
      )}
    </div>
  )
}
