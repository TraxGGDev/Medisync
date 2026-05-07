import { z } from 'zod'

export const pacienteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  telefono: z.string().min(1, 'El teléfono es obligatorio'),
  numero_seguro: z.string().min(1, 'El número de seguro es obligatorio'),
})

export const citaSchema = z
  .object({
    // En Zod v4, required_error no está soportado en z.number().
    // Se usa la función `error` para mensajes personalizados.
    paciente_id: z.number({
      error: (iss) =>
        iss.input === undefined ? 'Selecciona un paciente' : 'Debe ser un número válido',
    }),
    doctor_id: z.number({
      error: (iss) =>
        iss.input === undefined ? 'Selecciona un doctor' : 'Debe ser un número válido',
    }),
    fecha: z.string().min(1, 'La fecha es obligatoria'),
    hora_inicio: z.string().min(1, 'La hora de inicio es obligatoria'),
    hora_fin: z.string().min(1, 'La hora de fin es obligatoria'),
    motivo: z.string().min(1, 'El motivo es obligatorio'),
  })
  .refine((data) => data.hora_fin > data.hora_inicio, {
    message: 'La hora de fin debe ser posterior a la hora de inicio',
    path: ['hora_fin'],
  })
