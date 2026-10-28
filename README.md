# FinanzApp - Prueba de React Native Paper

Prueba funcional de la Actividad 5 (Programación Móvil): pantalla
"Registrar movimiento" de FinanzApp, hecha con React Native, Expo,
TypeScript y React Native Paper 5.x.

## Cómo ejecutarlo
npm install
npx expo start

## Estructura
- App.tsx: PaperProvider y tema global
- Theme.ts: tema personalizado (MD3DarkTheme) y tipo AppTheme
- RegistrarScreen.tsx: vista de Registrar movimiento
- viewmodels/useRegistrarViewModel.ts: estado y acciones del formulario
- models/Movimiento.ts: tipos, categorías y reglas del dominio

## Flujo de trabajo

### Ramas
- `main`: siempre estable, la app debe abrir en Expo Go.
- Una rama por Issue: `issue-<número>-<descripcion-corta>`.
- Los cambios llegan a `main` mediante Pull Request en Azure DevOps.

### Commits
Formato: `<tipo> #<tarea>: <descripción>`

Tipos: `feat`, `fix`, `docs`, `refactor`, `chore`.

Ejemplo: `feat #22: definir tipos Movimiento y Presupuesto`

El número de la tarea (`#22`) vincula el commit con el work item en Azure DevOps.