import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPacientes, buscarPacientes } from '../services/pacientesService'
import { PacienteTable } from '../components/pacientes/PacienteTable'

export function PacientesListPage() {
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  // Carga inicial — todos los pacientes
  const cargarTodos = useCallback(() => {
    setLoading(true)
    setError(null)
    getPacientes()
      .then(setPacientes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    cargarTodos()
  }, [cargarTodos])

  // Búsqueda con debounce de 400ms
  useEffect(() => {
    if (!query.trim()) {
      cargarTodos()
      return
    }

    const timer = setTimeout(() => {
      setLoading(true)
      setError(null)
      buscarPacientes(query.trim())
        .then(setPacientes)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, 400)

    return () => clearTimeout(timer)
  }, [query, cargarTodos])

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
          placeholder="🔍 Buscar por nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button
            onClick={cargarTodos}
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <PacienteTable
          pacientes={pacientes}
          loading={loading}
          onRowClick={(id) => navigate(`/pacientes/${id}`)}
        />
      )}
    </div>
  )
}
