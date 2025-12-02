# Backend (NestJS + Mongoose)

Instrucciones rápidas:

1. Instala dependencias:

```bash
cd backend
npm install
```

2. Para desarrollo (requiere Nest CLI instalado globalmente o en devDependencies):

```bash
npm run start:dev
```

3. Variables de entorno:
- MONGO_URI (por defecto mongodb://localhost:27017/inventory)
- PORT (por defecto 3000)

4. Tests:
- `npm test` (unitarios)
- `npm run test:e2e` (integración con mongodb-memory-server)
