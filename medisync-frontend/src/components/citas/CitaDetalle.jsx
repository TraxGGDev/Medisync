import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBadge } from '../ui/StatusBadge'
import { CancelDialog } from './CancelDialog'
import { isCitaEditable, formatFecha, formatHora } from '../../lib/utils'
import { cambiarEstadoCita } from '../../services/citasService'

export function CitaDetalle({ cita, onCancelConfirm, onEstadoChange }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cambiandoEstado, setCambiandoEstado] = useState(false)
  const navigate = useNavigate()
  const editable = isCitaEditable(cita)

  const handleConfirmCancel = async () => {
    setDialogOpen(false)
    await onCancelConfirm?.(cita.id)
  }

  const handleCompletada = async () => {
    setCambiandoEstado(true)
    try {
      const actualizada = await cambiarEstadoCita(cita.id, 'completada')
      onEstadoChange?.(actualizada)
    } catch (err) {
      alert(`Error: ${err.message}`)
    } finally {
      setCambiandoEstado(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Estado */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Estado:</span>
          <StatusBadge estado={cita.estado} />
        </div>

        {/* Paciente */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Paciente</h3>
          <dl className="space-y-2">
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32">Nombre</dt>
              <dd className="text-sm font-medium text-gray-900">{cita.paciente?.nombre}</dd>
            </div>
          </dl>
        </div>

        {/* Doctor */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Doctor</h3>
          <dl className="space-y-2">
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32">Nombre</dt>
              <dd className="text-sm font-medium text-gray-900">{cita.doctor?.nombre}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32">Especialidad</dt>
              <dd className="text-sm text-gray-700">{cita.doctor?.especialidad}</dd>
            </div>
          </dl>
        </div>

        {/* Cita */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Cita</h3>
          <dl className="space-y-2">
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32">Fecha</dt>
              <dd className="text-sm text-gray-700">{formatFecha(cita.fecha)}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32">Hora inicio</dt>
              <dd className="text-sm text-gray-700">{formatHora(cita.hora_inicio)}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32">Hora fin</dt>
              <dd className="text-sm text-gray-700">{formatHora(cita.hora_fin)}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32">Motivo</dt>
              <dd className="text-sm text-gray-700">{cita.motivo}</dd>
            </div>
            {cita.fecha_creacion && (
              <div className="flex gap-4">
                <dt className="text-sm text-gray-500 w-32">Registrada</dt>
                <dd className="text-sm text-gray-700">{formatFecha(cita.fecha_creacion)}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Acciones */}
      {editable && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setDialogOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Cancelar Cita
          </button>
          <button
            onClick={() => navigate(`/citas/${cita.id}/editar`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Editar Cita
          </button>
          <button
            onClick={handleCompletada}
            disabled={cambiandoEstado}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {cambiandoEstado ? 'Guardando...' : 'Marcar Completada'}
          </button>
        </div>
      )}

      <CancelDialog
        open={dialogOpen}
        onConfirm={handleConfirmCancel}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  )
}
