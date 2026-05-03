import { useNavigate } from 'react-router-dom'
import { PacienteForm } from '../components/pacientes/PacienteForm'

export function PacienteNuevoPage() {
  const navigate = useNavigate()

  const handleSuccess = (paciente) => {
    // Toast simple usando alert por ahora — se puede mejorar con shadcn/ui toast
    alert(`Paciente registrado. ID: #${paciente.id}`)
    navigate('/pacientes')
  }

  const handleCancel = () => {
    navigate('/pacientes')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrar Nuevo Paciente</h1>
      <PacienteForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  )
}
