export function EmptyState({ mensaje = 'No hay datos disponibles.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <p className="text-sm">{mensaje}</p>
    </div>
  )
}
