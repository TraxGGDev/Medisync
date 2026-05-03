import { useState, useCallback } from 'react'
import { getPacientes, createPaciente } from '../services/pacientesService'

export function usePacientes() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const pacientes = await getPacientes()
      setData(pacientes)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const registrar = useCallback(async (datos) => {
    const paciente = await createPaciente(datos)
    setData((prev) => [...prev, paciente])
    return paciente
  }, [])

  return { data, loading, error, cargar, registrar }
}
