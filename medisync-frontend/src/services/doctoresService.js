import api from './api'
import { doctoresMock } from '../mocks/doctoresMock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

export async function getDoctores() {
  if (USE_MOCK) {
    return Promise.resolve([...doctoresMock])
  }
  const res = await api.get('/doctores/')
  return res.data
}

export async function getDoctorById(id) {
  if (USE_MOCK) {
    const doctor = doctoresMock.find((d) => d.id === Number(id))
    if (!doctor) throw new Error('El doctor no existe')
    return Promise.resolve({ ...doctor })
  }
  const res = await api.get(`/doctores/${id}`)
  return res.data
}
