# Medisync 🏥

Sistema de gestión de citas médicas para clínicas y hospitales. Permite administrar doctores, pacientes y citas, con autenticación por rol (clínica o paciente).

---

## Tecnologías

**Backend**
- Python + FastAPI
- SQLAlchemy (ORM)
- MySQL (Amazon RDS)
- JWT para autenticación
- Uvicorn

**Frontend**
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hook Form + Zod

---

## Requisitos previos

- Instancia EC2 en AWS (Amazon Linux 2)
- Base de datos MySQL en Amazon RDS
- Node.js 20+
- Python 3.9+

---

## Despliegue en AWS

### 1. Conectarse a la instancia EC2

```bash
ssh -i tu-clave.pem ec2-user@TU_IP_PUBLICA
```

> ⚠️ La IP pública de EC2 cambia cada vez que se reinicia la instancia. Verifica la IP actual en la consola de AWS antes de conectarte.

### 2. Clonar el repositorio

```bash
https://github.com/TraxGGDev/Medisync.git
cd Medisync
```

---

### 3. Configurar el Backend

#### Instalar dependencias del sistema

```bash
sudo dnf install python3-pip -y
```

#### Instalar dependencias de Python

```bash
cd backend
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv python-jose[cryptography] passlib[bcrypt] bcrypt==4.0.1
```

#### Crear el archivo `.env`

```bash
nano .env
```

Agrega las siguientes variables:

```
DB_USER=admin
DB_PASSWORD=tu_contraseña
DB_HOST=database-1.cqqvkkkegaqy.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_NAME=hospital
SECRET_KEY=una_clave_secreta_larga
```

#### Crear la base de datos en RDS (si no existe)

```bash
mysql -h database-1.cqqvkkkegaqy.us-east-1.rds.amazonaws.com -u admin -p
```

```sql
CREATE DATABASE hospital;
EXIT;
```

#### Levantar el backend

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

El backend estará disponible en:
```
http://TU_IP_PUBLICA:8000
```

Documentación Swagger:
```
http://TU_IP_PUBLICA:8000/docs
```

---

### 4. Configurar el Frontend

Abre una nueva terminal y conéctate nuevamente a la instancia EC2.

#### Instalar Node.js 20 con nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

#### Instalar dependencias del frontend

```bash
cd medisync/medisync-frontend
rm -rf node_modules package-lock.json
npm install
```

#### Crear el archivo `.env`

```bash
nano .env
```

Agrega la URL del backend:

```
VITE_API_URL=http://TU_IP_PUBLICA:8000
```

#### Levantar el frontend

```bash
npm run dev -- --host 0.0.0.0
```

El frontend estará disponible en:
```
http://TU_IP_PUBLICA:5173
```

---

### 5. Configurar los grupos de seguridad en EC2

Asegúrate de tener abiertos los siguientes puertos en el grupo de seguridad de tu instancia EC2:

| Puerto | Protocolo | Descripción        |
|--------|-----------|--------------------|
| 22     | TCP       | SSH                |
| 8000   | TCP       | Backend (FastAPI)  |
| 5173   | TCP       | Frontend (Vite)    |

---

## Endpoints principales

### Autenticación
| Método | Ruta            | Descripción          |
|--------|-----------------|----------------------|
| POST   | /auth/register  | Registrar usuario    |
| POST   | /auth/login     | Iniciar sesión       |

### Doctores
| Método | Ruta                    | Descripción             |
|--------|-------------------------|-------------------------|
| POST   | /doctores/              | Registrar doctor        |
| GET    | /doctores/              | Listar doctores         |
| GET    | /doctores/{id}          | Obtener doctor por ID   |

### Pacientes
| Método | Ruta                        | Descripción              |
|--------|-----------------------------|--------------------------|
| POST   | /pacientes/                 | Registrar paciente       |
| GET    | /pacientes/                 | Listar pacientes         |
| GET    | /pacientes/buscar?nombre=   | Buscar paciente          |
| GET    | /pacientes/{id}             | Obtener paciente por ID  |
| PUT    | /pacientes/{id}/editar      | Editar paciente          |
| GET    | /pacientes/{id}/citas       | Ver citas del paciente   |

### Citas
| Método | Ruta                    | Descripción                  |
|--------|-------------------------|------------------------------|
| POST   | /citas/                 | Crear cita                   |
| GET    | /citas/                 | Listar todas las citas       |
| GET    | /citas/hoy              | Citas del día actual         |
| GET    | /citas/fecha?fecha=     | Citas por fecha              |
| GET    | /citas/{id}             | Obtener cita por ID          |
| GET    | /citas/{doctor_id}/citas| Citas por doctor             |
| PUT    | /citas/{id}/editar      | Editar cita                  |
| PATCH  | /citas/{id}/cancelar    | Cancelar cita                |
| PATCH  | /citas/{id}/estado      | Cambiar estado de cita       |

---

## Roles del sistema

| Rol      | Permisos                                                  |
|----------|-----------------------------------------------------------|
| clinica  | Acceso completo: doctores, pacientes y citas              |
| paciente | Solo puede ver sus propias citas agendadas                |

---

## Notas

- Las contraseñas se almacenan hasheadas con bcrypt, nunca en texto plano.
- Las citas tienen validación de horario del doctor y detección de traslapes.
- El campo `estado` de una cita puede ser: `agendada`, `cancelada` o `completada`.
- Para actualizar el código en producción usar `git pull origin main` y reiniciar los servidores.
