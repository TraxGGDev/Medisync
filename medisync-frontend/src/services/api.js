import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const mensaje =
      error.response?.data?.detail || 'Error de conexión con el servidor'
    return Promise.reject(new Error(mensaje))
  }
)

export default api
