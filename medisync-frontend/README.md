# MediSync — Frontend Web

Interfaz web de la plataforma MediSync para gestión de pacientes y citas médicas. Desarrollada con React 18 + Vite, Tailwind CSS y shadcn/ui.

---

## Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.x | Framework de UI |
| Vite | 8.x | Bundler y servidor de desarrollo |
| Tailwind CSS | 3.x | Estilos utilitarios |
| shadcn/ui (Radix) | 1.x | Componentes accesibles |
| React Router v7 | 7.x | Navegación entre páginas |
| Axios | 1.x | Cliente HTTP para la API |
| React Hook Form | 7.x | Manejo de formularios |
| Zod | 4.x | Validación de esquemas |
| Vitest | 4.x | Framework de pruebas |

---

## Requisitos previos

- **Node.js** v18 o superior
- **npm** v9 o superior

Verifica tu versión con:
```bash
node --version
npm --version
```

---

## Instalación

1. Clona el repositorio y entra al directorio del frontend:

```bash
git clone <url-del-repositorio>
cd medisync-frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo de variables de entorno:

```bash
cp .env.example .env
```

O crea el archivo `.env` manualmente con el siguiente contenido:

```env
VITE_API_URL=http://localhost:8000
VITE_USE_MOCK_API=true
```

---

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API_URL` | URL base del backend FastAPI | `http://localhost:8000` |
| `VITE_USE_MOCK_API` | Usar datos mock en lugar del backend real | `true` |

> **Nota:** Con `VITE_USE_MOCK_API=true` la aplicación funciona completamente sin necesidad de tener el backend corriendo. Cambia a `false` cuando el backend esté disponible.

---

## Ejecución en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## Build para producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`. Para previsualizar el build:

```bash
npm run preview
```

---

## Ejecutar pruebas

```bash
npx vitest --run
```

Para modo watch (re-ejecuta al guardar cambios):

```bash
npx vitest
```

---

## Estructura del proyecto

```
medisync-frontend/
├── src/
│   ├── components/
│   │   ├── citas/          # CitaForm, CitaTable, CitaDetalle, CancelDialog
│   │   ├── doctores/       # DoctorTable
│   │   ├── layout/         # AppLayout, Sidebar, Header
│   │   ├── pacientes/      # PacienteForm, PacienteTable
│   │   └── ui/             # StatusBadge, LoadingSpinner, EmptyState
│   ├── context/            # AppContext (usuario activo)
│   ├── hooks/              # useCitas, usePacientes, useDoctores
│   ├── lib/                # schemas.js (Zod), utils.js, cn.js
│   ├── mocks/              # Datos mock para desarrollo sin backend
│   ├── pages/              # Páginas de la aplicación (8 rutas)
│   ├── services/           # Capa de servicios API (mock/HTTP)
│   └── test/               # Configuración de pruebas
├── .env                    # Variables de entorno (no commitear)
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Rutas de la aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Dashboard | Agenda del día actual |
| `/pacientes` | PacientesListPage | Búsqueda y listado de pacientes |
| `/pacientes/nuevo` | PacienteNuevoPage | Registro de nuevo paciente |
| `/doctores` | DoctoresPage | Catálogo de médicos |
| `/citas/nueva` | CitaNuevaPage | Crear nueva cita |
| `/citas/:id` | CitaDetallePage | Detalle de una cita |
| `/citas/:id/editar` | CitaEditarPage | Editar cita existente |
| `/agenda-doctor` | AgendaDoctorPage | Agenda filtrada por doctor y fecha |

---

## Conexión con el backend

El frontend consume la API REST del backend FastAPI. Los endpoints utilizados son:

| Módulo | Método | Endpoint |
|---|---|---|
| Pacientes | GET | `/pacientes/` |
| Pacientes | POST | `/pacientes/` |
| Pacientes | GET | `/pacientes/{id}` |
| Doctores | GET | `/doctores/` |
| Citas | GET | `/citas/` |
| Citas | POST | `/citas/` |
| Citas | PUT | `/citas/{id}` |

Para conectar con el backend real:
1. Asegúrate de que el backend FastAPI esté corriendo en `http://localhost:8000`
2. Cambia `VITE_USE_MOCK_API=false` en el archivo `.env`
3. Reinicia el servidor de desarrollo con `npm run dev`

---

## Guía de estilo visual

| Elemento | Valor | Justificación |
|---|---|---|
| Color primario | Azul (`blue-600` / `#2563EB`) | Transmite confianza y profesionalismo, estándar en sistemas médicos |
| Color de error | Rojo (`red-600` / `#DC2626`) | Convención universal para alertas y acciones destructivas |
| Color neutro | Gris (`gray-*`) | Fondos, bordes y texto secundario sin distracciones |
| Estado agendada | Verde (`green-100/800`) | Asociación positiva, cita activa |
| Estado cancelada | Rojo (`red-100/800`) | Alerta visual inmediata |
| Estado completada | Gris (`gray-100/700`) | Neutral, acción ya concluida |
| Tipografía | Inter (sistema) | Legibilidad en pantallas, sin carga de fuente externa |
| Espaciado base | 4px (Tailwind) | Consistencia en toda la interfaz |
| Radio de bordes | `rounded-md` (6px) | Apariencia moderna sin ser excesivamente redondeada |

---

## Desarrollador

**Rol:** Desarrollador Web - Zeus Samael Aguirre Martinez 
**Proyecto:** MediSync — Plataforma de Gestión Médica Digital  
**Materia:** Diseño y Arquitectura de Software  
**Universidad:** Tecmilenio — 2026
