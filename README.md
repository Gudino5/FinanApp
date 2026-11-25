# FinanApp

App móvil de finanzas personales para estudiantes con ingresos variables. Permite registrar ingresos y gastos, ver el balance, consultar el historial con filtro por categoría y definir presupuestos mensuales.

Proyecto integrador de Programación Móvil (TecNM, ITES Zamora).

## Tecnologías

- React Native con Expo (SDK 58) y TypeScript
- React Native Paper (interfaz, tema oscuro)
- React Navigation (barra de pestañas inferior)
- AsyncStorage (almacenamiento local)
- Azure DevOps (planeación y repositorio) y GitHub (copia del repositorio)

## Estado actual

**Funciona**
- Inicio: balance, ingresos, gastos y movimientos recientes.
- Registrar: formulario con validación, selector de fecha y módulo para adjuntar ticket.
- Historial: lista con filtro por categoría.
- Presupuestos: vista de progreso del gasto del mes por categoría.
- Los datos se guardan en el celular y siguen ahí al cerrar la app.

**Pendiente**
- Formulario para crear y editar límites de presupuesto.
- Inicio de sesión con Clerk.
- Base de datos NoSQL remota para tener cuentas y sincronización.
- Manejo de errores y estados de carga, y pruebas de los ViewModels.

## Cómo correr la app

### Requisitos


- Node.js (versión LTS) y npm
- La app **Expo Go** instalada en el celular, en su versión más reciente (debe coincidir con el SDK 58)
- El celular y la computadora conectados a la **misma red Wi-Fi**

### Pasos

```bash
git clone https://dev.azure.com/L23010070/FinanApp/_git/FinanApp
cd FinanApp
npm install
npx expo start
```

Abre Expo Go en el celular y escanea el código QR que aparece en la terminal.

### Problemas frecuentes

- **La app no abre en el celular:** revisa que ambos equipos estén en la misma red, o prueba `npx expo start --tunnel`.
- **Expo Go dice que el proyecto es incompatible:** actualiza Expo Go desde la tienda de aplicaciones.
- **Cambios que no se reflejan:** reinicia con `npx expo start -c` para limpiar la caché.
- **Revisar errores de tipos:** `npx tsc --noEmit`.

## Arquitectura

Se usa el patrón **MVVM** adaptado a React con hooks, más una capa de servicios. Cada capa depende solo de la de abajo.

```
Vista (views) → ViewModel (viewmodels) → Servicio (services) → Almacenamiento → AsyncStorage
```

| Carpeta | Qué contiene |

|---|---|
| `views/` | Pantallas. Solo muestran datos y avisan lo que el usuario toca. |
| `viewmodels/` | Hooks con el estado y la lógica de cada pantalla. |
| `models/` | Tipos de datos (Movimiento, Presupuesto, Categoria). |
| `services/` | Acceso a los datos (`movimientosService`, `presupuestosService`, `almacenamiento`). |
| `components/` | Componentes reutilizables (Header, Tarjeta, TarjetaBalance, EstadoVacio...). |
| `navigation/` | Barra de pestañas y tipos de navegación. |
| `utils/` | Funciones auxiliares (validación, formato, ids). |
| `Theme.ts` | Colores y tema oscuro. |

La vista nunca toca AsyncStorage directamente: si en el futuro cambia dónde se guardan los datos, solo se modifican los servicios.

## Flujo de trabajo

La planeación está en Azure DevOps con el proceso **Agile**.

### Jerarquía

- **User Story:** una funcionalidad vista desde el usuario (por ejemplo, "Registrar un movimiento").
- **Task:** una parte concreta de la historia, de 1 a 4 horas, con su estimación en **Remaining Work**.
- Cada tarea se planea para un día en su descripción y pertenece a un sprint.

### Estados

`New` → `Active` (cuando se empieza) → `Closed` (al terminar, con Remaining Work en 0).

### Ramas

- `main` siempre debe estar estable: la app tiene que abrir en Expo Go.
- Se crea **una rama por User Story**, con el número de la historia:
  `issue-<número de la historia>-<descripcion-corta>`
  Ejemplo: `issue-15-presupuestos`.

- Los cambios llegan a `main` solo mediante Pull Request en Azure DevOps.

### Commits

Formato: `<tipo> #<tarea>: <descripción>`

Tipos: `feat` (funcionalidad nueva), `fix` (corrección), `docs` (documentación), `refactor` (reorganizar código), `chore` (dependencias o configuración).

Ejemplo: `feat #49: crear servicio de presupuestos`

El número de la tarea vincula el commit con el work item en Azure DevOps. Un commit por tarea.

### Pasos para cada tarea

1. `git checkout main` y `git pull origin main`
2. `git checkout -b issue-15-presupuestos`
3. Programar, probar en Expo Go y revisar tipos con `npx tsc --noEmit`.
4. Commit con el número de la tarea.
5. `git push origin issue-15-presupuestos`
6. Abrir el Pull Request hacia `main` en Azure DevOps y completarlo con **Delete source branch**.
7. Sincronizar: `git checkout main`, `git pull origin main`, `git push github main` y `git fetch --prune`.
8. Pasar la tarea a **Closed** con Remaining Work en 0.

### Repositorios

- `origin`: Azure DevOps (repositorio principal)
- `github`: copia en GitHub, que se actualiza con `git push github main`

## Sprints

- **Sprint 1** (21 oct al 6 nov): estructura MVVM, tema oscuro, componentes, navegación, Historial e Inicio.
- **Sprint 2** (11 al 26 nov): Registrar, persistencia local y Presupuestos.
- **Sprint 3** (27 nov al 18 dic): cuentas con Clerk, base de datos NoSQL, manejo de errores, pruebas y entrega final.