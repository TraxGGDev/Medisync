import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/useAppContext'
import { formatFecha } from '../../lib/utils'

export function Header() {
  const { usuarioActivo, cerrarSesionActiva } = useAppContext()
  const navigate = useNavigate()
  const hoy = formatFecha(new Date().toISOString())

  const handleLogout = () => {
    cerrarSesionActiva()
    navigate('/login')
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <span className="text-sm text-gray-500">{hoy}</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
            {usuarioActivo?.nombre?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium text-gray-700">{usuarioActivo?.nombre}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-gray-500 hover:text-red-600 border border-gray-200 px-2 py-1 rounded transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}
