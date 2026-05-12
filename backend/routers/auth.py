from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from auth import hashear_password, verificar_password, crear_token

router = APIRouter(
    prefix="/auth",
    tags=["Autenticacion"]
)

@router.post("/register", response_model=schemas.UsuarioResponse)
def registrar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    
    # Verificar que el email no exista ya
    usuario_db = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    
    if usuario_db:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    nuevo_usuario = models.Usuario(
        email=usuario.email,
        password=hashear_password(usuario.password),
        rol=usuario.rol,
        paciente_id=None
    )
    
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

@router.post("/login")
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    
    # Verificar que el usuario existe
    usuario_db = db.query(models.Usuario).filter(models.Usuario.email == request.email).first()
    
    if not usuario_db:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    # Verificar password
    if not verificar_password(request.password, usuario_db.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    # Generar token
    token = crear_token({"sub": usuario_db.email, "rol": usuario_db.rol, "id": usuario_db.id})
    
    return {"access_token": token, "token_type": "bearer", "rol": usuario_db.rol}