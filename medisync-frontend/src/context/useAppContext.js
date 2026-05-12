import { useContext } from 'react'
import { AppContext } from './context'

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext debe usarse dentro de AppProvider')
  return ctx
}
