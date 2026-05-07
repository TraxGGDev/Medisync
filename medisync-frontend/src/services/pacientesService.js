import api from './api'
import { pacientesMock } from '../mocks/pacientesMock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

// Copia mutable del array mock para simular persistencia en sesión
let mockData = [...pacientesMock]

export async function getPacientes() {
  if (USE_MOCK) {
    return Promise.resolve([...mockData])
  }
  const res = await api.get('/pacientes/')
  return res.data
}

export async function getPacienteById(id) {
  if (USE_MOCK) {
    const paciente = mockData.find((p) => p.id === Number(id))
    if (!paciente) throw new Error('No se encontró el paciente')
    return Promise.resolve({ ...paciente })
  }
  const res = await api.get(`/pacientes/${id}`)
  return res.data
}

export async function createPaciente(datos) {
  if (USE_MOCK) {
    const nuevo = {
      id: mockData.length + 1,
      ...datos,
    }
    mockData.push(nuevo)
    return Promise.resolve({ ...nuevo })
  }
  const res = await api.post('/pacientes/', datos)
  return res.data
}
