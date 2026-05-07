import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AppLayout } from './components/layout/AppLayout'

// Pages — se crearán en tareas posteriores, por ahora placeholders
import { DashboardPage } from './pages/DashboardPage'
import { PacientesListPage } from './pages/PacientesListPage'
import { PacienteNuevoPage } from './pages/PacienteNuevoPage'
import { DoctoresPage } from './pages/DoctoresPage'
import { CitaNuevaPage } from './pages/CitaNuevaPage'
import { CitaDetallePage } from './pages/CitaDetallePage'
import { CitaEditarPage } from './pages/CitaEditarPage'
import { AgendaDoctorPage } from './pages/AgendaDoctorPage'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="pacientes" element={<PacientesListPage />} />
            <Route path="pacientes/nuevo" element={<PacienteNuevoPage />} />
            <Route path="doctores" element={<DoctoresPage />} />
            <Route path="citas/nueva" element={<CitaNuevaPage />} />
            <Route path="citas/:id" element={<CitaDetallePage />} />
            <Route path="citas/:id/editar" element={<CitaEditarPage />} />
            <Route path="agenda-doctor" element={<AgendaDoctorPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
