import api from './api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

/**
 * Login: POST /auth/login
 * Retorna { access_token, token_type, rol }
 */
export async function login(email, password) {
  if (USE_MOCK) {
    // Mock: cualquier credencial válida retorna un token simulado
    if (!email || !password) throw new Error('Credenciales incorrectas')
    return Promise.resolve({
      access_token: 'mock-token',
      token_type: 'bearer',
      rol: 'recepcionista',
    })
  }
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

/**
 * Registro: POST /auth/register
 */
export async function register(email, password, rol, paciente_id = null) {
  if (USE_MOCK) {
    return Promise.resolve({ id: 1, email, rol })
  }
  const payload = { email, password, rol }
  if (paciente_id) payload.paciente_id = paciente_id
  const res = await api.post('/auth/register', payload)
  return res.data
}

/**
 * Guarda el token en localStorage
 */
export function guardarToken(token) {
  localStorage.setItem('medisync_token', token)
}

/**
 * Obtiene el token guardado
 */
export function obtenerToken() {
  return localStorage.getItem('medisync_token')
}

/**
 * Elimina el token (logout)
 */
export function cerrarSesion() {
  localStorage.removeItem('medisync_token')
  localStorage.removeItem('medisync_rol')
}
