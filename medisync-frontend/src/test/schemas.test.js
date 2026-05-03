import { describe, it, expect } from 'vitest'
import { pacienteSchema, citaSchema } from '../lib/schemas'

// ─────────────────────────────────────────────
// CASO DE PRUEBA 5 — pacienteSchema
// Verifica que la validación del formulario de paciente funcione
// ─────────────────────────────────────────────
describe('pacienteSchema', () => {
  it('CP-05: acepta datos válidos de paciente', () => {
    const resultado = pacienteSchema.safeParse({
      nombre: 'Juan Pérez',
      telefono: '555-1234',
      numero_seguro: 'IMSS-001234',
    })
    expect(resultado.success).toBe(true)
  })

  it('CP-05b: rechaza si el nombre está vacío', () => {
    const resultado = pacienteSchema.safeParse({
      nombre: '',
      telefono: '555-1234',
      numero_seguro: 'IMSS-001234',
    })
    expect(resultado.success).toBe(false)
    const campos = resultado.error.issues.map((i) => i.path[0])
    expect(campos).toContain('nombre')
  })

  it('CP-05c: rechaza si el teléfono está vacío', () => {
    const resultado = pacienteSchema.safeParse({
      nombre: 'Juan Pérez',
      telefono: '',
      numero_seguro: 'IMSS-001234',
    })
    expect(resultado.success).toBe(false)
    const campos = resultado.error.issues.map((i) => i.path[0])
    expect(campos).toContain('telefono')
  })

  it('CP-05d: rechaza si el número de seguro está vacío', () => {
    const resultado = pacienteSchema.safeParse({
      nombre: 'Juan Pérez',
      telefono: '555-1234',
      numero_seguro: '',
    })
    expect(resultado.success).toBe(false)
    const campos = resultado.error.issues.map((i) => i.path[0])
    expect(campos).toContain('numero_seguro')
  })
})

// ─────────────────────────────────────────────
// CASO DE PRUEBA 6 — citaSchema
// Verifica que la validación del formulario de cita funcione
// ─────────────────────────────────────────────
describe('citaSchema', () => {
  const citaValida = {
    paciente_id: 1,
    doctor_id: 2,
    fecha: '2025-07-14',
    hora_inicio: '09:00',
    hora_fin: '09:30',
    motivo: 'Consulta general',
  }

  it('CP-06: acepta datos válidos de cita', () => {
    const resultado = citaSchema.safeParse(citaValida)
    expect(resultado.success).toBe(true)
  })

  it('CP-06b: rechaza si hora_fin es igual a hora_inicio', () => {
    const resultado = citaSchema.safeParse({
      ...citaValida,
      hora_inicio: '09:00',
      hora_fin: '09:00',
    })
    expect(resultado.success).toBe(false)
    const paths = resultado.error.issues.map((i) => i.path).flat()
    expect(paths).toContain('hora_fin')
  })

  it('CP-06c: rechaza si hora_fin es anterior a hora_inicio', () => {
    const resultado = citaSchema.safeParse({
      ...citaValida,
      hora_inicio: '10:00',
      hora_fin: '09:00',
    })
    expect(resultado.success).toBe(false)
    const paths = resultado.error.issues.map((i) => i.path).flat()
    expect(paths).toContain('hora_fin')
  })

  it('CP-06d: rechaza si el motivo está vacío', () => {
    const resultado = citaSchema.safeParse({ ...citaValida, motivo: '' })
    expect(resultado.success).toBe(false)
    const campos = resultado.error.issues.map((i) => i.path[0])
    expect(campos).toContain('motivo')
  })

  it('CP-06e: rechaza si la fecha está vacía', () => {
    const resultado = citaSchema.safeParse({ ...citaValida, fecha: '' })
    expect(resultado.success).toBe(false)
    const campos = resultado.error.issues.map((i) => i.path[0])
    expect(campos).toContain('fecha')
  })
})
