import { LoadingSpinner } from '../ui/LoadingSpinner'
import { EmptyState } from '../ui/EmptyState'

export function PacienteTable({ pacientes = [], loading, onRowClick }) {
  if (loading) return <LoadingSpinner />

  if (pacientes.length === 0) {
    return <EmptyState mensaje="No se encontraron pacientes." />
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Seguro</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pacientes.map((p) => (
            <tr
              key={p.id}
              onClick={() => onRowClick?.(p.id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{p.telefono}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{p.numero_seguro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
