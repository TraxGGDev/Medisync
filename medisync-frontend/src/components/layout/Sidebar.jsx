import { NavLink, useNavigate } from 'react-router-dom'
import { CalendarDays, Users, Stethoscope, CalendarCheck } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useAppContext } from '../../context/useAppContext'

const navItems = [
  { to: '/', label: 'Citas del Día', icon: CalendarDays, end: true },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/doctores', label: 'Médicos', icon: Stethoscope },
  { to: '/agenda-doctor', label: 'Agenda por Doctor', icon: CalendarCheck },
]

export function Sidebar() {
  const { usuarioActivo } = useAppContext()
  const navigate = useNavigate()
  const esRecepcionista = usuarioActivo?.rol === 'recepcionista'

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200">
        <span className="text-xl font-bold text-blue-700">MediSync</span>
        {usuarioActivo?.rol && (
          <p className="text-xs text-gray-400 mt-0.5 capitalize">{usuarioActivo.rol}</p>
        )}
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Botón agregar doctor — solo recepcionista */}
      {esRecepcionista && (
        <div className="px-3 pb-4">
          <button
            onClick={() => navigate('/doctores/nuevo')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Agregar Doctor
          </button>
        </div>
      )}
    </aside>
  )
}
