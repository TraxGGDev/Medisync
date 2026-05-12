import { useState } from 'react'
import { AppContext } from './context'

export function AppProvider({ children }) {
  const [usuarioActivo] = useState({ nombre: 'Recepcionista', rol: 'recepcionista' })

  return (
    <AppContext.Provider value={{ usuarioActivo }}>
      {children}
    </AppContext.Provider>
  )
}
