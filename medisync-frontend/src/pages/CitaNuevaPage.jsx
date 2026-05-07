import { useNavigate } from 'react-router-dom'
import { CitaForm } from '../components/citas/CitaForm'

export function CitaNuevaPage() {
  const navigate = useNavigate()

  return (
    <div>
      <CitaForm
        cita={null}
        onSuccess={() => {
          navigate('/')
        }}
        onCancel={() => navigate('/')}
      />
    </div>
  )
}
