from pydantic import BaseModel, Field
from datetime import datetime, time
from typing import Literal, Optional

class DoctorCreate(BaseModel):
    nombre:str
    especialidad:str
    horario_inicio: time
    horario_fin: time
    dias_disponibles: str
    
class DoctorResponse(BaseModel):
    id:int
    nombre:str
    especialidad:str
    horario_inicio: time
    horario_fin: time
    dias_disponibles: str
    
    class Config:
        from_attributes=True
        
class PacienteCreate(BaseModel):
    nombre:str
    telefono:str
    numero_seguro:str
    
class PacienteResponse(BaseModel):
    id:int
    nombre:str
    telefono:str
    numero_seguro:str
    
    class Config:
        from_attributes=True

class CitaCreate(BaseModel):
    paciente_id:int
    doctor_id:int
    fecha:datetime
    hora_inicio:time
    hora_fin:time
    motivo:str

class DoctorMini(BaseModel):
    nombre:str
    especialidad:str
    
    class Config:
        from_attributes=True
        
class PacienteMini(BaseModel):
    nombre:str
    
    class Config:
        from_attributes=True
    
class CitaResponse(BaseModel):
    id:int
    fecha:datetime
    hora_inicio:time
    hora_fin:time
    motivo:str
    estado:str
    doctor: DoctorMini
    paciente: PacienteMini
    fecha_creacion: datetime
    
    class Config:
        from_attributes=True
    
class CitaUpdate(BaseModel):
    fecha: datetime
    hora_inicio: time
    hora_fin: time
    motivo: str
    

class PacienteUpdate(BaseModel):
    nombre: str
    telefono: str 
        
    
class CitaStatusUpdate(BaseModel):
    estado: Literal["agendada", "cancelada", "completada"]
    
    
class UsuarioCreate(BaseModel):
    email:str
    password:str = Field(max_length=72)
    rol:str
    
class UsuarioResponse(BaseModel):
    id:int
    email: str
    rol: str
    paciente_id: Optional[int] = None
    
    class Config:
        from_attributes=True

class LoginRequest(BaseModel):
    
    email: str
    password: str
    