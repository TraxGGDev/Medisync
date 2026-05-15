import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AppLayout } from './components/layout/AppLayout'
import { useAppContext } from './context/useAppContext'

import { DashboardPage } from './pages/DashboardPage'
import { PacientesListPage } from './pages/PacientesListPage'
import { PacienteNuevoPage } from './pages/PacienteNuevoPage'
import { PacienteDetallePage } from './pages/PacienteDetallePage'
import { DoctoresPage } from './pages/DoctoresPage'
import { CitaNuevaPage } from './pages/CitaNuevaPage'
import { CitaDetallePage } from './pages/CitaDetallePage'
import { CitaEditarPage } from './pages/CitaEditarPage'
import { AgendaDoctorPage } from './pages/AgendaDoctorPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { MisCitasPage } from './pages/MisCitasPage'
import { MiCitaDetallePage } from './pages/MiCitaDetallePage'
import { DoctorNuevoPage } from './pages/DoctorNuevoPage'

// Ruta privada para clínica (recepcionista/doctor)
function RutaClinica({ children }) {
  const { usuarioActivo, cargando } = useAppContext()
  if (cargando) return null
  if (!usuarioActivo) return <Navigate to="/login" replace />
  if (usuarioActivo.rol === 'paciente') return <Navigate to="/mis-citas" replace />
  return children
}

// Ruta privada para paciente
function RutaPaciente({ children }) {
  const { usuarioActivo, cargando } = useAppContext()
  if (cargando) return null
  if (!usuarioActivo) return <Navigate to="/login" replace />
  if (usuarioActivo.rol !== 'paciente') return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Vista paciente */}
      <Route
        path="/mis-citas"
        element={
          <RutaPaciente>
            <MisCitasPage />
          </RutaPaciente>
        }
      />
      <Route
        path="/mis-citas/:id"
        element={
          <RutaPaciente>
            <MiCitaDetallePage />
          </RutaPaciente>
        }
      />

      {/* Rutas clínica */}
      <Route
        path="/"
        element={
          <RutaClinica>
            <AppLayout />
          </RutaClinica>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="pacientes" element={<PacientesListPage />} />
        <Route path="pacientes/nuevo" element={<PacienteNuevoPage />} />
        <Route path="pacientes/:id" element={<PacienteDetallePage />} />
        <Route path="doctores" element={<DoctoresPage />} />
        <Route path="doctores/nuevo" element={<DoctorNuevoPage />} />
        <Route path="citas/nueva" element={<CitaNuevaPage />} />
        <Route path="citas/:id" element={<CitaDetallePage />} />
        <Route path="citas/:id/editar" element={<CitaEditarPage />} />
        <Route path="agenda-doctor" element={<AgendaDoctorPage />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
