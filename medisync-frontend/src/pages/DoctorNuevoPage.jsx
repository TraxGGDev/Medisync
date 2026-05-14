import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createDoctor } from '../services/doctoresService'

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export function DoctorNuevoPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    especialidad: '',
    horario_inicio: '',
    horario_fin: '',
  })
  const [diasSeleccionados, setDiasSeleccionados] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleDia = (dia) => {
    setDiasSeleccionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (diasSeleccionados.length === 0) {
      setError('Selecciona al menos un día disponible')
      return
    }

    setLoading(true)
    try {
      await createDoctor({
        ...form,
        horario_inicio: form.horario_inicio + ':00',
        horario_fin: form.horario_fin + ':00',
        dias_disponibles: diasSeleccionados.join(','),
      })
      navigate('/doctores')
    } catch (err) {
      setError(err.message || 'Error al registrar el doctor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => navigate('/doctores')}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrar Nuevo Doctor</h1>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Dr. Juan García"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Especialidad <span className="text-red-500">*</span>
          </label>
          <input
            name="especialidad"
            value={form.especialidad}
            onChange={handleChange}
            required
            placeholder="Ej. Cardiología"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horario inicio <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="horario_inicio"
              value={form.horario_inicio}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horario fin <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="horario_fin"
              value={form.horario_fin}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Días disponibles <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {DIAS.map((dia) => (
              <button
                key={dia}
                type="button"
                onClick={() => toggleDia(dia)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  diasSeleccionados.includes(dia)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/doctores')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Registrando...' : 'Registrar Doctor'}
          </button>
        </div>
      </form>
    </div>
  )
}
