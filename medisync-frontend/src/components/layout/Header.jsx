import { useAppContext } from '../../context/AppContext'
import { formatFecha } from '../../lib/utils'

export function Header() {
  const { usuarioActivo } = useAppContext()
  const hoy = formatFecha(new Date().toISOString())

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <span className="text-sm text-gray-500">{hoy}</span>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
          {usuarioActivo.nombre.charAt(0)}
        </div>
        <span className="text-sm font-medium text-gray-700">{usuarioActivo.nombre}</span>
      </div>
    </header>
  )
}
