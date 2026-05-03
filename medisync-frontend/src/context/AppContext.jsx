import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [usuarioActivo] = useState({ nombre: 'Recepcionista', rol: 'recepcionista' })

  return (
    <AppContext.Provider value={{ usuarioActivo }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext debe usarse dentro de AppProvider')
  return ctx
}
