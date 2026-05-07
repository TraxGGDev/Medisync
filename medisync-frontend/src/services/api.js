import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Preservamos el objeto error original con response.status para que
    // los servicios puedan detectar 404 y tratarlo como lista vacía
    const mensaje =
      error.response?.data?.detail || 'Error de conexión con el servidor'
    const err = new Error(mensaje)
    err.response = error.response  // preservar status code
    return Promise.reject(err)
  }
)

export default api
