import { useState, useCallback } from 'react'
import { getDoctores } from '../services/doctoresService'

export function useDoctores() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const doctores = await getDoctores()
      setData(doctores)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, cargar }
}
