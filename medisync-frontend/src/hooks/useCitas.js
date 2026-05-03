import { useState, useCallback } from 'react'
import { getCitas, createCita, updateCita, cancelarCita } from '../services/citasService'

export function useCitas() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const cargar = useCallback(async (filtros = {}) => {
    setLoading(true)
    setError(null)
    try {
      const citas = await getCitas(filtros)
      setData(citas)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelar = useCallback(async (id) => {
    const citaActualizada = await cancelarCita(id)
    setData((prev) =>
      prev.map((c) => (c.id === Number(id) ? citaActualizada : c))
    )
    return citaActualizada
  }, [])

  const guardar = useCallback(async (id, datos) => {
    if (id) {
      const citaActualizada = await updateCita(id, datos)
      setData((prev) =>
        prev.map((c) => (c.id === Number(id) ? citaActualizada : c))
      )
      return citaActualizada
    } else {
      const nuevaCita = await createCita(datos)
      setData((prev) => [...prev, nuevaCita])
      return nuevaCita
    }
  }, [])

  return { data, loading, error, cargar, cancelar, guardar }
}
