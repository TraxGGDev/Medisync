import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { citaSchema } from '../../lib/schemas'
import { getPacientes } from '../../services/pacientesService'
import { getDoctores } from '../../services/doctoresService'
import { createCita, updateCita } from '../../services/citasService'

export function CitaForm({ cita = null, onSuccess, onCancel }) {
  const [pacientes, setPacientes] = useState([])
  const [doctores, setDoctores] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)

  const isEditing = Boolean(cita)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(citaSchema),
    defaultValues: cita
      ? {
          paciente_id: cita.paciente_id,
          doctor_id: cita.doctor_id,
          fecha: cita.fecha ? cita.fecha.substring(0, 10) : '',
          hora_inicio: cita.hora_inicio ? cita.hora_inicio.substring(0, 5) : '',
          hora_fin: cita.hora_fin ? cita.hora_fin.substring(0, 5) : '',
          motivo: cita.motivo,
        }
      : {},
  })

  useEffect(() => {
    Promise.all([getPacientes(), getDoctores()]).then(([p, d]) => {
      setPacientes(p)
      setDoctores(d)
    })
  }, [])

  const onSubmit = async (datos) => {
    setSubmitting(true)
    setApiError(null)
    try {
      let resultado
      if (isEditing) {
        resultado = await updateCita(cita.id, datos)
      } else {
        resultado = await createCita(datos)
      }
      onSuccess?.(resultado)
    } catch (err) {
      setApiError(err.message || 'Error al guardar la cita.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
      <h2 className="text-xl font-bold text-gray-900">
        {isEditing ? `Editar Cita #${cita.id}` : 'Nueva Cita'}
      </h2>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {apiError}
        </div>
      )}

      {/* Paciente */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paciente <span className="text-red-500">*</span>
        </label>
        <select
          {...register('paciente_id', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar paciente...</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
        {errors.paciente_id && (
          <p className="mt-1 text-xs text-red-600">{errors.paciente_id.message}</p>
        )}
      </div>

      {/* Doctor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Doctor <span className="text-red-500">*</span>
        </label>
        <select
          {...register('doctor_id', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar doctor...</option>
          {doctores.map((d) => (
            <option key={d.id} value={d.id}>{d.nombre} — {d.especialidad}</option>
          ))}
        </select>
        {errors.doctor_id && (
          <p className="mt-1 text-xs text-red-600">{errors.doctor_id.message}</p>
        )}
      </div>

      {/* Fecha, Hora inicio, Hora fin */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register('fecha')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fecha && (
            <p className="mt-1 text-xs text-red-600">{errors.fecha.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora inicio <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register('hora_inicio')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.hora_inicio && (
            <p className="mt-1 text-xs text-red-600">{errors.hora_inicio.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora fin <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register('hora_fin')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.hora_fin && (
            <p className="mt-1 text-xs text-red-600">{errors.hora_fin.message}</p>
          )}
        </div>
      </div>

      {/* Motivo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motivo <span className="text-red-500">*</span>
        </label>
        <input
          {...register('motivo')}
          placeholder="Ej. Consulta general"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.motivo && (
          <p className="mt-1 text-xs text-red-600">{errors.motivo.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Guardando...' : 'Guardar Cita'}
        </button>
      </div>
    </form>
  )
}
