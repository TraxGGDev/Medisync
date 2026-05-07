import { LoadingSpinner } from '../ui/LoadingSpinner'
import { EmptyState } from '../ui/EmptyState'
import { StatusBadge } from '../ui/StatusBadge'
import { formatHora } from '../../lib/utils'

export function CitaTable({ citas = [], loading, onRowClick, emptyMessage = 'No hay citas disponibles.' }) {
  if (loading) return <LoadingSpinner />

  if (citas.length === 0) {
    return <EmptyState mensaje={emptyMessage} />
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {citas.map((c) => (
            <tr
              key={c.id}
              onClick={() => onRowClick?.(c.id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                {formatHora(c.hora_inicio)} – {formatHora(c.hora_fin)}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.paciente?.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{c.doctor?.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{c.motivo}</td>
              <td className="px-6 py-4">
                <StatusBadge estado={c.estado} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
