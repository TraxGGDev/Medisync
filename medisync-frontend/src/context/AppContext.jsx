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
    if (token) {
      setUsuarioActivo({ nombre, rol })
    }
    setCargando(false)
  }, [])

  const iniciarSesion = (token, rol, nombre = 'Usuario') => {
    localStorage.setItem('medisync_token', token)
    localStorage.setItem('medisync_rol', rol)
    localStorage.setItem('medisync_nombre', nombre)
    setUsuarioActivo({ nombre, rol })
  }

  const cerrarSesionActiva = () => {
    cerrarSesion()
    localStorage.removeItem('medisync_nombre')
    setUsuarioActivo(null)
  }

  return (
    <AppContext.Provider value={{ usuarioActivo, cargando, iniciarSesion, cerrarSesionActiva }}>
      {children}
    </AppContext.Provider>
  )
}
