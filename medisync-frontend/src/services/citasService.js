import api from './api'
import { citasMock } from '../mocks/citasMock'
import { pacientesMock } from '../mocks/pacientesMock'
import { doctoresMock } from '../mocks/doctoresMock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

// Copia mutable del array mock
let mockData = [...citasMock]

export async function getCitas(filtros = {}) {
  if (USE_MOCK) {
    let resultado = [...mockData]
    if (filtros.fecha) {
      const fechaFiltro = filtros.fecha.substring(0, 10)
      resultado = resultado.filter((c) => c.fecha.substring(0, 10) === fechaFiltro)
    }
    if (filtros.doctor_id) {
      resultado = resultado.filter((c) => c.doctor_id === Number(filtros.doctor_id))
    }
    return Promise.resolve(resultado)
  }
  const res = await api.get('/citas/', { params: filtros })
  return res.data
}

export async function getCitaById(id) {
  if (USE_MOCK) {
    const cita = mockData.find((c) => c.id === Number(id))
    if (!cita) throw new Error('La cita no existe')
    const pacienteCompleto = pacientesMock.find((p) => p.id === cita.paciente_id)
    const doctorCompleto = doctoresMock.find((d) => d.id === cita.doctor_id)
    return Promise.resolve({
      ...cita,
      paciente: pacienteCompleto
        ? {
            nombre: pacienteCompleto.nombre,
            telefono: pacienteCompleto.telefono,
            numero_seguro: pacienteCompleto.numero_seguro,
          }
        : cita.paciente,
      doctor: doctorCompleto
        ? { nombre: doctorCompleto.nombre, especialidad: doctorCompleto.especialidad }
        : cita.doctor,
    })
  }
  const res = await api.get(`/citas/${id}`)
  return res.data
}

export async function createCita(datos) {
  if (USE_MOCK) {
    const nueva = {
      id: mockData.length + 1,
      ...datos,
      estado: 'agendada',
      doctor: { nombre: 'Doctor Mock', especialidad: 'Especialidad Mock' },
      paciente: { nombre: 'Paciente Mock' },
    }
    mockData.push(nueva)
    return Promise.resolve({ ...nueva })
  }
  const res = await api.post('/citas/', { ...datos, estado: 'agendada' })
  return res.data
}

export async function updateCita(id, datos) {
  if (USE_MOCK) {
    const idx = mockData.findIndex((c) => c.id === Number(id))
    if (idx === -1) throw new Error('La cita no existe')
    mockData[idx] = { ...mockData[idx], ...datos }
    return Promise.resolve({ ...mockData[idx] })
  }
  const res = await api.put(`/citas/${id}`, datos)
  return res.data
}

export async function cancelarCita(id) {
  return updateCita(id, { estado: 'cancelada' })
}
