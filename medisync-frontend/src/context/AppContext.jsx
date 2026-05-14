import { useState, useEffect } from 'react'
import { AppContext } from './context'
import { obtenerToken, cerrarSesion } from '../services/authService'

export function AppProvider({ children }) {
  const [usuarioActivo, setUsuarioActivo] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const token = obtenerToken()
    const rol = localStorage.getItem('medisync_rol')
    const nombre = localStorage.getItem('medisync_nombre') || 'Usuario'
    const pacienteId = localStorage.getItem('medisync_paciente_id')
    if (token) {
      setUsuarioActivo({ nombre, rol, pacienteId })
    }
    setCargando(false)
  }, [])

  const iniciarSesion = (token, rol, nombre = 'Usuario', pacienteId = null) => {
    localStorage.setItem('medisync_token', token)
    localStorage.setItem('medisync_rol', rol)
    localStorage.setItem('medisync_nombre', nombre)
    if (pacienteId) {
      localStorage.setItem('medisync_paciente_id', pacienteId)
    } else {
      localStorage.removeItem('medisync_paciente_id')
    }
    setUsuarioActivo({ nombre, rol, pacienteId })
  }

  const cerrarSesionActiva = () => {
    cerrarSesion()
    localStorage.removeItem('medisync_nombre')
    localStorage.removeItem('medisync_paciente_id')
    setUsuarioActivo(null)
  }

  return (
    <AppContext.Provider value={{ usuarioActivo, cargando, iniciarSesion, cerrarSesionActiva }}>
      {children}
    </AppContext.Provider>
  )
}
