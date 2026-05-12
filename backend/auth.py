from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY no está definida en las variables de entorno")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hashear_password(password: str):
    return pwd_context.hash(password[:72])

def verificar_password(password: str, hash: str):
    return pwd_context.verify(password[:72], hash)

def crear_token(data: dict):
    datos = data.copy()
    expiracion = datetime.utcnow() + timedelta(hours=8)
    datos.update({"exp": expiracion})
    return jwt.encode(datos, SECRET_KEY, algorithm=ALGORITHM)