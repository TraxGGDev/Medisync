import { LoadingSpinner } from '../ui/LoadingSpinner'
import { EmptyState } from '../ui/EmptyState'
import { formatHora } from '../../lib/utils'

export function DoctorTable({ doctores = [], loading }) {
  if (loading) return <LoadingSpinner />

  if (doctores.length === 0) {
    return <EmptyState mensaje="No hay médicos registrados." />
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Días disponibles</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {doctores.map((d) => (
            <tr key={d.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{d.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{d.especialidad}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatHora(d.horario_inicio)} – {formatHora(d.horario_fin)}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {d.dias_disponibles.split(',').map((dia) => (
                    <span
                      key={dia.trim()}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                    >
                      {dia.trim()}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
