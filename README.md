# Proyecto Final - Inventario (Boilerplate)

Este repositorio contiene un proyecto base funcional para el proyecto final de la asignatura Pruebas de Software.

## Contenidos
- backend/: NestJS + Mongoose (API REST con endpoints para categories y products)
- frontend/: React + Vite (UI mínima que consume la API)
- .github/workflows/ci.yml: pipeline de ejemplo para GitHub Actions
- docs/plan-de-pruebas.md: plantilla del plan de pruebas

## Cómo usar
1. Clonar y entrar al proyecto
2. Instalar dependencias en backend y frontend
3. Levantar MongoDB local o usar MONGO_URI

Backend (ejemplo):
```
cd backend
npm install
npm run start:dev
```

Frontend (ejemplo):
```
cd frontend
npm install
npm run dev
```

Ajusta variables de entorno según necesites (MONGO_URI, PORT, VITE_API_URL).

> Nota: Este paquete es un boilerplate. Para evaluar funcionalidad completa asegúrate de ejecutar `npm install` en ambos proyectos y tener MongoDB disponible o usar la configuración por defecto.
