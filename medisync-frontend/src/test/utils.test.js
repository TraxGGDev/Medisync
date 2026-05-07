import { describe, it, expect } from 'vitest'
import { formatFecha, formatHora, isCitaEditable, filtrarPacientes } from '../lib/utils'

// ─────────────────────────────────────────────
// CASO DE PRUEBA 1 — formatFecha
// Verifica que las fechas ISO se formateen correctamente a dd/mm/aaaa
// ─────────────────────────────────────────────
describe('formatFecha', () => {
  it('CP-01: formatea una fecha ISO a dd/mm/aaaa', () => {
    expect(formatFecha('2025-07-14T09:00:00.000Z')).toMatch(/14\/07\/2025/)
  })

  it('CP-01b: retorna cadena vacía si el valor es nulo o vacío', () => {
    expect(formatFecha(null)).toBe('')
    expect(formatFecha('')).toBe('')
    expect(formatFecha(undefined)).toBe('')
  })
})

// ─────────────────────────────────────────────
// CASO DE PRUEBA 2 — formatHora
// Verifica que las horas HH:MM:SS se recorten a HH:MM
// ─────────────────────────────────────────────
describe('formatHora', () => {
  it('CP-02: recorta HH:MM:SS a HH:MM', () => {
    expect(formatHora('09:30:00')).toBe('09:30')
    expect(formatHora('14:00:00')).toBe('14:00')
  })

  it('CP-02b: retorna cadena vacía si el valor es nulo o vacío', () => {
    expect(formatHora(null)).toBe('')
    expect(formatHora('')).toBe('')
    expect(formatHora(undefined)).toBe('')
  })
})

// ─────────────────────────────────────────────
// CASO DE PRUEBA 3 — isCitaEditable
// Verifica que solo las citas con estado "agendada" sean editables
// ─────────────────────────────────────────────
describe('isCitaEditable', () => {
  it('CP-03: retorna true para citas con estado agendada', () => {
    expect(isCitaEditable({ estado: 'agendada' })).toBe(true)
  })

  it('CP-03b: retorna false para citas canceladas', () => {
    expect(isCitaEditable({ estado: 'cancelada' })).toBe(false)
  })

  it('CP-03c: retorna false para citas completadas', () => {
    expect(isCitaEditable({ estado: 'completada' })).toBe(false)
  })

  it('CP-03d: retorna false si la cita es nula o indefinida', () => {
    expect(isCitaEditable(null)).toBe(false)
    expect(isCitaEditable(undefined)).toBe(false)
  })
})

// ─────────────────────────────────────────────
// CASO DE PRUEBA 4 — filtrarPacientes
// Verifica que el filtro por nombre y teléfono funcione correctamente
// ─────────────────────────────────────────────
describe('filtrarPacientes', () => {
  const lista = [
    { id: 1, nombre: 'Juan Pérez', telefono: '555-1234' },
    { id: 2, nombre: 'Ana López', telefono: '555-5678' },
    { id: 3, nombre: 'Carlos Díaz', telefono: '555-9012' },
  ]

  it('CP-04: filtra por nombre parcial (case-insensitive)', () => {
    const resultado = filtrarPacientes(lista, 'juan')
    expect(resultado).toHaveLength(1)
    expect(resultado[0].nombre).toBe('Juan Pérez')
  })

  it('CP-04b: filtra por teléfono parcial', () => {
    const resultado = filtrarPacientes(lista, '5678')
    expect(resultado).toHaveLength(1)
    expect(resultado[0].nombre).toBe('Ana López')
  })

  it('CP-04c: retorna la lista completa si la búsqueda está vacía', () => {
    expect(filtrarPacientes(lista, '')).toHaveLength(3)
    expect(filtrarPacientes(lista, '   ')).toHaveLength(3)
  })

  it('CP-04d: retorna lista vacía si no hay coincidencias', () => {
    expect(filtrarPacientes(lista, 'zzz')).toHaveLength(0)
  })

  it('CP-04e: el resultado es siempre un subconjunto de la lista original', () => {
    const resultado = filtrarPacientes(lista, 'an')
    resultado.forEach((p) => {
      expect(lista).toContainEqual(p)
    })
  })
})
