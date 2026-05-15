import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService'
import { getPacientes } from '../services/pacientesService'

export function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('recepcionista')
  const [numeroSeguro, setNumeroSeguro] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (rol === 'paciente' && !numeroSeguro.trim()) {
      setError('Debes ingresar tu número de seguro')
      return
    }

    setLoading(true)
    try {
      // Si es paciente, buscar su ID por número de seguro
      let pacienteId = null
      if (rol === 'paciente') {
        const pacientes = await getPacientes()
        const pacienteEncontrado = pacientes.find(
          (p) => p.numero_seguro.trim().toLowerCase() === numeroSeguro.trim().toLowerCase()
        )
        if (!pacienteEncontrado) {
          setError('No se encontró ningún paciente con ese número de seguro. Verifica el dato o contacta a la clínica.')
          setLoading(false)
          return
        }
        pacienteId = pacienteEncontrado.id
        // Guardar para usarlo después del login
        localStorage.setItem('medisync_registro_paciente_id', String(pacienteId))
      }

      await register(email, password, rol, pacienteId)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Error al registrar usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-blue-700">MediSync</h1>
          <p className="text-sm text-gray-500 mt-1">Crea tu cuenta</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="correo@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de cuenta
            </label>
            <select
              value={rol}
              onChange={(e) => { setRol(e.target.value); setNumeroSeguro('') }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recepcionista">Personal de clínica (Recepcionista)</option>
              <option value="paciente">Paciente</option>
            </select>
          </div>

          {rol === 'paciente' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de seguro <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={numeroSeguro}
                onChange={(e) => setNumeroSeguro(e.target.value)}
                required
                placeholder="Ej. IMSS-001234"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ingresa el número de seguro con el que te registró la clínica.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Verificando...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
