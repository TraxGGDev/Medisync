/**
 * Formatea una fecha ISO 8601 a "dd/mm/aaaa"
 * @param {string} isoString
 * @returns {string}
 */
export function formatFecha(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const dia = String(date.getDate()).padStart(2, '0')
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const anio = date.getFullYear()
  return `${dia}/${mes}/${anio}`
}

/**
 * Formatea una hora "HH:MM:SS" a "HH:MM"
 * @param {string} hhmmss
 * @returns {string}
 */
export function formatHora(hhmmss) {
  if (!hhmmss) return ''
  return hhmmss.substring(0, 5)
}

/**
 * Determina si una cita puede ser editada o cancelada
 * @param {{ estado: string }} cita
 * @returns {boolean}
 */
export function isCitaEditable(cita) {
  if (!cita) return false
  return cita.estado === 'agendada'
}

/**
 * Filtra una lista de pacientes por nombre o teléfono (case-insensitive)
 * @param {Array<{nombre: string, telefono: string}>} lista
 * @param {string} query
 * @returns {Array}
 */
export function filtrarPacientes(lista, query) {
  if (!query || query.trim() === '') return lista
  const q = query.toLowerCase().trim()
  return lista.filter(
    (p) =>
      p.nombre.toLowerCase().includes(q) ||
      p.telefono.toLowerCase().includes(q)
  )
}
