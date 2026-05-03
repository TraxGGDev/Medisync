import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pacienteSchema } from '../../lib/schemas'
import { createPaciente } from '../../services/pacientesService'
import { useState } from 'react'

export function PacienteForm({ onSuccess, onCancel }) {
  const [apiError, setApiError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(pacienteSchema) })

  const onSubmit = async (datos) => {
    setSubmitting(true)
    setApiError(null)
    try {
      const paciente = await createPaciente(datos)
      onSuccess?.(paciente)
    } catch (err) {
      if (
        err.message?.toLowerCase().includes('teléfono') ||
        err.message?.toLowerCase().includes('telefono') ||
        err.message?.toLowerCase().includes('unique') ||
        err.message?.toLowerCase().includes('duplicate')
      ) {
        setApiError('El teléfono ya está registrado.')
      } else {
        setApiError(err.message || 'Error al registrar el paciente.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {apiError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          {...register('nombre')}
          placeholder="Ej. Juan Pérez"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.nombre && (
          <p className="mt-1 text-xs text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          {...register('telefono')}
          placeholder="Ej. 555-1234"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.telefono && (
          <p className="mt-1 text-xs text-red-600">{errors.telefono.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de seguro <span className="text-red-500">*</span>
        </label>
        <input
          {...register('numero_seguro')}
          placeholder="Ej. IMSS-00123456"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.numero_seguro && (
          <p className="mt-1 text-xs text-red-600">{errors.numero_seguro.message}</p>
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
          {submitting ? 'Registrando...' : 'Registrar Paciente'}
        </button>
      </div>
    </form>
  )
}
