import api from './api'
import { citasMock } from '../mocks/citasMock'
import { pacientesMock } from '../mocks/pacientesMock'
import { doctoresMock } from '../mocks/doctoresMock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

// Copia mutable del array mock
let mockData = [...citasMock]

/**
 * Obtiene citas. Acepta filtros opcionales: { fecha?, doctor_id? }
 * - Sin filtros        → GET /citas/
 * - Con fecha=hoy      → GET /citas/hoy
 * - Con doctor_id      → GET /citas/{doctor_id}/citas
 */
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

  try {
    // Filtro por doctor: GET /citas/{doctor_id}/citas
    if (filtros.doctor_id) {
      const res = await api.get(`/citas/${filtros.doctor_id}/citas`)
      return res.data
    }

    // Filtro por fecha de hoy: GET /citas/hoy
    const hoy = new Date().toISOString().substring(0, 10)
    if (filtros.fecha && filtros.fecha === hoy) {
      const res = await api.get('/citas/hoy')
      return res.data
    }

    // Sin filtros: GET /citas/
    const res = await api.get('/citas/')
    return res.data
  } catch (err) {
    // El backend retorna 404 cuando no hay citas — lo tratamos como lista vacía
    if (err.message?.includes('404') || err.response?.status === 404) {
      return []
    }
    throw err
  }
}

/**
 * Obtiene una cita por ID: GET /citas/{id}
 */
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

/**
 * Crea una nueva cita: POST /citas/
 * El backend espera: { paciente_id, doctor_id, fecha (ISO datetime), hora_inicio, hora_fin, motivo }
 */
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

  // El backend espera fecha como ISO datetime completo
  const payload = {
    ...datos,
    fecha: datos.fecha.includes('T') ? datos.fecha : `${datos.fecha}T00:00:00`,
    hora_inicio: datos.hora_inicio.length === 5 ? `${datos.hora_inicio}:00` : datos.hora_inicio,
    hora_fin: datos.hora_fin.length === 5 ? `${datos.hora_fin}:00` : datos.hora_fin,
  }

  const res = await api.post('/citas/', payload)
  return res.data
}

/**
 * Modifica una cita: PUT /citas/{id}/editar
 * El backend espera: { fecha, hora_inicio, hora_fin, motivo }
 */
export async function updateCita(id, datos) {
  if (USE_MOCK) {
    const idx = mockData.findIndex((c) => c.id === Number(id))
    if (idx === -1) throw new Error('La cita no existe')
    mockData[idx] = { ...mockData[idx], ...datos }
    return Promise.resolve({ ...mockData[idx] })
  }

  const payload = {
    fecha: datos.fecha.includes('T') ? datos.fecha : `${datos.fecha}T00:00:00`,
    hora_inicio: datos.hora_inicio.length === 5 ? `${datos.hora_inicio}:00` : datos.hora_inicio,
    hora_fin: datos.hora_fin.length === 5 ? `${datos.hora_fin}:00` : datos.hora_fin,
    motivo: datos.motivo,
  }

  const res = await api.put(`/citas/${id}/editar`, payload)
  return res.data
}

/**
 * Cancela una cita: PATCH /citas/{id}/cancelar
 */
export async function cancelarCita(id) {
  if (USE_MOCK) {
    const idx = mockData.findIndex((c) => c.id === Number(id))
    if (idx === -1) throw new Error('La cita no existe')
    mockData[idx] = { ...mockData[idx], estado: 'cancelada' }
    return Promise.resolve({ ...mockData[idx] })
  }
  const res = await api.patch(`/citas/${id}/cancelar`)
  return res.data
}

/**
 * Cambia el estado de una cita: PATCH /citas/{id}/estado
 */
export async function cambiarEstadoCita(id, estado) {
  if (USE_MOCK) {
    const idx = mockData.findIndex((c) => c.id === Number(id))
    if (idx === -1) throw new Error('La cita no existe')
    mockData[idx] = { ...mockData[idx], estado }
    return Promise.resolve({ ...mockData[idx] })
  }
  const res = await api.patch(`/citas/${id}/estado`, { estado })
  return res.data
}
