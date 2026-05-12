import { createContext } from 'react'

// Objeto contexto separado del componente Provider
// para cumplir con la regla react-refresh/only-export-components
export const AppContext = createContext(null)
