const estadoConfig = {
  agendada: { label: 'Agendada', className: 'bg-green-100 text-green-800' },
  cancelada: { label: 'Cancelada', className: 'bg-red-100 text-red-800' },
  completada: { label: 'Completada', className: 'bg-gray-100 text-gray-700' },
}

export function StatusBadge({ estado }) {
  const config = estadoConfig[estado] || { label: estado, className: 'bg-gray-100 text-gray-700' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
