import api from './api'
import { pacientesMock } from '../mocks/pacientesMock'
import { citasMock } from '../mocks/citasMock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

let mockData = [...pacientesMock]

/**
 * Lista todos los pacientes: GET /pacientes/
 */
export async function getPacientes() {
  if (USE_MOCK) return Promise.resolve([...mockData])
  const res = await api.get('/pacientes/')
  return res.data
}

/**
 * Busca pacientes por nombre (server-side): GET /pacientes/buscar?nombre=X
 * Si no hay resultados el backend retorna 404 → devolvemos []
 */
export async function buscarPacientes(nombre) {
  if (USE_MOCK) {
    const q = nombre.toLowerCase()
    return Promise.resolve(mockData.filter((p) => p.nombre.toLowerCase().includes(q)))
  }
  try {
    const res = await api.get('/pacientes/buscar', { params: { nombre } })
    return res.data
  } catch (err) {
    if (err.response?.status === 404) return []
    throw err
  }
}

/**
 * Obtiene un paciente por ID: GET /pacientes/{id}
 */
export async function getPacienteById(id) {
  if (USE_MOCK) {
    const paciente = mockData.find((p) => p.id === Number(id))
    if (!paciente) throw new Error('No se encontró el paciente')
    return Promise.resolve({ ...paciente })
  }
  const res = await api.get(`/pacientes/${id}`)
  return res.data
}

/**
 * Registra un nuevo paciente: POST /pacientes/
 */
export async function createPaciente(datos) {
  if (USE_MOCK) {
    const nuevo = { id: mockData.length + 1, ...datos }
    mockData.push(nuevo)
    return Promise.resolve({ ...nuevo })
  }
  const res = await api.post('/pacientes/', datos)
  return res.data
}

/**
 * Edita nombre y teléfono de un paciente: PUT /pacientes/{id}/editar
 */
export async function updatePaciente(id, datos) {
  if (USE_MOCK) {
    const idx = mockData.findIndex((p) => p.id === Number(id))
    if (idx === -1) throw new Error('El paciente no existe')
    mockData[idx] = { ...mockData[idx], ...datos }
    return Promise.resolve({ ...mockData[idx] })
  }
  const res = await api.put(`/pacientes/${id}/editar`, datos)
  return res.data
}

/**
 * Obtiene el historial de citas de un paciente: GET /pacientes/{id}/citas
 */
export async function getCitasPaciente(pacienteId) {
  if (USE_MOCK) {
    return Promise.resolve(citasMock.filter((c) => c.paciente_id === Number(pacienteId)))
  }
  try {
    const res = await api.get(`/pacientes/${pacienteId}/citas`)
    return res.data
  } catch (err) {
    if (err.response?.status === 404) return []
    throw err
  }
}
