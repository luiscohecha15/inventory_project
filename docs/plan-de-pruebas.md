# Plan de Pruebas - Inventario

## Objetivo
Verificar que la API y la interfaz permiten crear categorías y productos, y visualizarlos correctamente.

## Casos de prueba

- CP-001: Crear categoría
  - Tipo: Integración / E2E
  - Precondiciones: Base vacía
  - Pasos: POST /api/categories -> verificar 201 y body
  - Esperado: Categoria creada con id

- CP-002: Crear producto
  - Tipo: Integración / E2E
  - Precondiciones: Tener categoría creada
  - Pasos: POST /api/products con category_id -> verificar 201
  - Esperado: Producto creado y aparece en GET /api/products

- CP-003: Flujo E2E (UI)
  - Tipo: E2E (Playwright)
  - Precondiciones: Backend corriendo y frontend corriendo
  - Pasos: Crear categoría desde UI -> Crear producto desde UI -> Verificar listado
  - Esperado: Producto visible en la lista con la categoría correcta

 (Backend)Para la ejecucion de pruebas unitarias (npm test), pruebas e2e (npm test:e2e)
 (Frontend) Para la ejecuacion de pruebas unitarias npm test, pruebas e2e (npx playwright test)