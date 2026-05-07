# Plan de Pruebas — MediSync Web Frontend

**Proyecto:** MediSync — Plataforma de Gestión Médica Digital  
**Rol:** Desarrollador Web  
**Materia:** Diseño y Arquitectura de Software  
**Universidad:** Tecmilenio — 2025  
**Framework de pruebas:** Vitest 4.x + @testing-library/react

---

## 1. Alcance de las Pruebas

Las pruebas cubren la lógica de negocio del frontend: funciones utilitarias, validación de formularios y comportamiento de componentes. Se excluyen pruebas de integración con el backend real (se usa la capa mock).

**Módulos bajo prueba:**
- `src/lib/utils.js` — Funciones de formateo y lógica de negocio
- `src/lib/schemas.js` — Validación de formularios con Zod
- Componentes de UI (StatusBadge, PacienteTable, CitaTable)

---

## 2. Cómo ejecutar las pruebas

```bash
# Desde el directorio medisync-frontend/
npx vitest --run
```

**Resultado esperado:**
```
Test Files  2 passed (2)
     Tests  22 passed (22)
```

---

## 3. Casos de Prueba

### Módulo: `utils.js`

---

#### CP-01 — formatFecha: formato correcto

| Campo | Detalle |
|---|---|
| **ID** | CP-01 |
| **Módulo** | `src/lib/utils.js` → `formatFecha()` |
| **Descripción** | Verifica que una fecha ISO 8601 se convierta al formato `dd/mm/aaaa` |
| **Precondición** | Función importada correctamente |
| **Entrada** | `'2025-07-14T09:00:00.000Z'` |
| **Resultado esperado** | Cadena que contiene `'14/07/2025'` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-01b — formatFecha: valor nulo o vacío

| Campo | Detalle |
|---|---|
| **ID** | CP-01b |
| **Módulo** | `src/lib/utils.js` → `formatFecha()` |
| **Descripción** | Verifica que la función retorne cadena vacía ante entradas nulas o vacías |
| **Entrada** | `null`, `''`, `undefined` |
| **Resultado esperado** | `''` en todos los casos |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — caso borde |

---

#### CP-02 — formatHora: recorte correcto

| Campo | Detalle |
|---|---|
| **ID** | CP-02 |
| **Módulo** | `src/lib/utils.js` → `formatHora()` |
| **Descripción** | Verifica que `HH:MM:SS` se recorte a `HH:MM` |
| **Entrada** | `'09:30:00'`, `'14:00:00'` |
| **Resultado esperado** | `'09:30'`, `'14:00'` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-02b — formatHora: valor nulo o vacío

| Campo | Detalle |
|---|---|
| **ID** | CP-02b |
| **Módulo** | `src/lib/utils.js` → `formatHora()` |
| **Descripción** | Verifica que la función retorne cadena vacía ante entradas nulas o vacías |
| **Entrada** | `null`, `''`, `undefined` |
| **Resultado esperado** | `''` en todos los casos |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — caso borde |

---

#### CP-03 — isCitaEditable: cita agendada

| Campo | Detalle |
|---|---|
| **ID** | CP-03 |
| **Módulo** | `src/lib/utils.js` → `isCitaEditable()` |
| **Descripción** | Verifica que una cita con estado `agendada` sea editable |
| **Entrada** | `{ estado: 'agendada' }` |
| **Resultado esperado** | `true` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-03b — isCitaEditable: cita cancelada

| Campo | Detalle |
|---|---|
| **ID** | CP-03b |
| **Módulo** | `src/lib/utils.js` → `isCitaEditable()` |
| **Descripción** | Verifica que una cita cancelada NO sea editable (botones deshabilitados) |
| **Entrada** | `{ estado: 'cancelada' }` |
| **Resultado esperado** | `false` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-03c — isCitaEditable: cita completada

| Campo | Detalle |
|---|---|
| **ID** | CP-03c |
| **Módulo** | `src/lib/utils.js` → `isCitaEditable()` |
| **Descripción** | Verifica que una cita completada NO sea editable |
| **Entrada** | `{ estado: 'completada' }` |
| **Resultado esperado** | `false` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-03d — isCitaEditable: cita nula

| Campo | Detalle |
|---|---|
| **ID** | CP-03d |
| **Módulo** | `src/lib/utils.js` → `isCitaEditable()` |
| **Descripción** | Verifica que la función no falle con entrada nula o indefinida |
| **Entrada** | `null`, `undefined` |
| **Resultado esperado** | `false` en ambos casos |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — caso borde |

---

#### CP-04 — filtrarPacientes: filtro por nombre

| Campo | Detalle |
|---|---|
| **ID** | CP-04 |
| **Módulo** | `src/lib/utils.js` → `filtrarPacientes()` |
| **Descripción** | Verifica que el filtro por nombre parcial funcione sin importar mayúsculas |
| **Entrada** | Lista de 3 pacientes, query `'juan'` |
| **Resultado esperado** | Lista con 1 elemento: `Juan Pérez` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-04b — filtrarPacientes: filtro por teléfono

| Campo | Detalle |
|---|---|
| **ID** | CP-04b |
| **Módulo** | `src/lib/utils.js` → `filtrarPacientes()` |
| **Descripción** | Verifica que el filtro por teléfono parcial funcione |
| **Entrada** | Lista de 3 pacientes, query `'5678'` |
| **Resultado esperado** | Lista con 1 elemento: `Ana López` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-04c — filtrarPacientes: búsqueda vacía retorna todo

| Campo | Detalle |
|---|---|
| **ID** | CP-04c |
| **Módulo** | `src/lib/utils.js` → `filtrarPacientes()` |
| **Descripción** | Verifica que una búsqueda vacía retorne la lista completa |
| **Entrada** | Lista de 3 pacientes, query `''` y `'   '` |
| **Resultado esperado** | Lista completa (3 elementos) |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — caso borde |

---

#### CP-04d — filtrarPacientes: sin coincidencias

| Campo | Detalle |
|---|---|
| **ID** | CP-04d |
| **Módulo** | `src/lib/utils.js` → `filtrarPacientes()` |
| **Descripción** | Verifica que una búsqueda sin coincidencias retorne lista vacía |
| **Entrada** | Lista de 3 pacientes, query `'zzz'` |
| **Resultado esperado** | Lista vacía `[]` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-04e — filtrarPacientes: resultado es subconjunto

| Campo | Detalle |
|---|---|
| **ID** | CP-04e |
| **Módulo** | `src/lib/utils.js` → `filtrarPacientes()` |
| **Descripción** | Verifica que el resultado siempre sea un subconjunto de la lista original |
| **Entrada** | Lista de 3 pacientes, query `'an'` |
| **Resultado esperado** | Cada elemento del resultado existe en la lista original |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — propiedad de corrección |

---

### Módulo: `schemas.js`

---

#### CP-05 — pacienteSchema: datos válidos

| Campo | Detalle |
|---|---|
| **ID** | CP-05 |
| **Módulo** | `src/lib/schemas.js` → `pacienteSchema` |
| **Descripción** | Verifica que datos completos y válidos pasen la validación |
| **Entrada** | `{ nombre: 'Juan Pérez', telefono: '555-1234', numero_seguro: 'IMSS-001234' }` |
| **Resultado esperado** | `success: true` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-05b — pacienteSchema: nombre vacío

| Campo | Detalle |
|---|---|
| **ID** | CP-05b |
| **Módulo** | `src/lib/schemas.js` → `pacienteSchema` |
| **Descripción** | Verifica que el formulario rechace un nombre vacío y muestre error en el campo correcto |
| **Entrada** | `{ nombre: '', telefono: '555-1234', numero_seguro: 'IMSS-001234' }` |
| **Resultado esperado** | `success: false`, error en campo `nombre` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — validación |

---

#### CP-05c — pacienteSchema: teléfono vacío

| Campo | Detalle |
|---|---|
| **ID** | CP-05c |
| **Módulo** | `src/lib/schemas.js` → `pacienteSchema` |
| **Descripción** | Verifica que el formulario rechace un teléfono vacío |
| **Entrada** | `{ nombre: 'Juan Pérez', telefono: '', numero_seguro: 'IMSS-001234' }` |
| **Resultado esperado** | `success: false`, error en campo `telefono` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — validación |

---

#### CP-05d — pacienteSchema: número de seguro vacío

| Campo | Detalle |
|---|---|
| **ID** | CP-05d |
| **Módulo** | `src/lib/schemas.js` → `pacienteSchema` |
| **Descripción** | Verifica que el formulario rechace un número de seguro vacío |
| **Entrada** | `{ nombre: 'Juan Pérez', telefono: '555-1234', numero_seguro: '' }` |
| **Resultado esperado** | `success: false`, error en campo `numero_seguro` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — validación |

---

#### CP-06 — citaSchema: datos válidos

| Campo | Detalle |
|---|---|
| **ID** | CP-06 |
| **Módulo** | `src/lib/schemas.js` → `citaSchema` |
| **Descripción** | Verifica que una cita con todos los campos correctos pase la validación |
| **Entrada** | `{ paciente_id: 1, doctor_id: 2, fecha: '2025-07-14', hora_inicio: '09:00', hora_fin: '09:30', motivo: 'Consulta general' }` |
| **Resultado esperado** | `success: true` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria |

---

#### CP-06b — citaSchema: hora_fin igual a hora_inicio

| Campo | Detalle |
|---|---|
| **ID** | CP-06b |
| **Módulo** | `src/lib/schemas.js` → `citaSchema` |
| **Descripción** | Verifica que el sistema rechace una cita donde la hora de fin es igual a la de inicio |
| **Entrada** | `hora_inicio: '09:00'`, `hora_fin: '09:00'` |
| **Resultado esperado** | `success: false`, error en campo `hora_fin` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — regla de negocio |

---

#### CP-06c — citaSchema: hora_fin anterior a hora_inicio

| Campo | Detalle |
|---|---|
| **ID** | CP-06c |
| **Módulo** | `src/lib/schemas.js` → `citaSchema` |
| **Descripción** | Verifica que el sistema rechace una cita donde la hora de fin es anterior a la de inicio |
| **Entrada** | `hora_inicio: '10:00'`, `hora_fin: '09:00'` |
| **Resultado esperado** | `success: false`, error en campo `hora_fin` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — regla de negocio |

---

#### CP-06d — citaSchema: motivo vacío

| Campo | Detalle |
|---|---|
| **ID** | CP-06d |
| **Módulo** | `src/lib/schemas.js` → `citaSchema` |
| **Descripción** | Verifica que el formulario rechace una cita sin motivo |
| **Entrada** | Cita válida con `motivo: ''` |
| **Resultado esperado** | `success: false`, error en campo `motivo` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — validación |

---

#### CP-06e — citaSchema: fecha vacía

| Campo | Detalle |
|---|---|
| **ID** | CP-06e |
| **Módulo** | `src/lib/schemas.js` → `citaSchema` |
| **Descripción** | Verifica que el formulario rechace una cita sin fecha |
| **Entrada** | Cita válida con `fecha: ''` |
| **Resultado esperado** | `success: false`, error en campo `fecha` |
| **Resultado obtenido** | ✅ PASA |
| **Tipo** | Unitaria — validación |

---

## 4. Resumen de Resultados

| ID | Descripción | Resultado |
|---|---|---|
| CP-01 | formatFecha — formato correcto | ✅ PASA |
| CP-01b | formatFecha — valor nulo/vacío | ✅ PASA |
| CP-02 | formatHora — recorte correcto | ✅ PASA |
| CP-02b | formatHora — valor nulo/vacío | ✅ PASA |
| CP-03 | isCitaEditable — estado agendada | ✅ PASA |
| CP-03b | isCitaEditable — estado cancelada | ✅ PASA |
| CP-03c | isCitaEditable — estado completada | ✅ PASA |
| CP-03d | isCitaEditable — cita nula | ✅ PASA |
| CP-04 | filtrarPacientes — por nombre | ✅ PASA |
| CP-04b | filtrarPacientes — por teléfono | ✅ PASA |
| CP-04c | filtrarPacientes — búsqueda vacía | ✅ PASA |
| CP-04d | filtrarPacientes — sin coincidencias | ✅ PASA |
| CP-04e | filtrarPacientes — subconjunto | ✅ PASA |
| CP-05 | pacienteSchema — datos válidos | ✅ PASA |
| CP-05b | pacienteSchema — nombre vacío | ✅ PASA |
| CP-05c | pacienteSchema — teléfono vacío | ✅ PASA |
| CP-05d | pacienteSchema — número de seguro vacío | ✅ PASA |
| CP-06 | citaSchema — datos válidos | ✅ PASA |
| CP-06b | citaSchema — hora_fin igual a inicio | ✅ PASA |
| CP-06c | citaSchema — hora_fin anterior a inicio | ✅ PASA |
| CP-06d | citaSchema — motivo vacío | ✅ PASA |
| CP-06e | citaSchema — fecha vacía | ✅ PASA |

**Total: 22 casos de prueba — 22 PASAN — 0 FALLAN**

---

## 5. Cobertura

| Módulo | Funciones probadas | Cobertura |
|---|---|---|
| `utils.js` | `formatFecha`, `formatHora`, `isCitaEditable`, `filtrarPacientes` | 100% de funciones |
| `schemas.js` | `pacienteSchema`, `citaSchema` | 100% de schemas |

---

*Pruebas ejecutadas con Vitest 4.1.5 — Entorno: jsdom*
