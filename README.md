
# 🧩 MIMS Survey Platform

Este repositorio contiene una solución **Full Stack profesional y modular** para la gestión de encuestas, desarrollada como prueba técnica para la empresa MIMS Notary.

## 📦 Estructura del Proyecto

```
.
├── backend/    # API REST con Node.js, Express, Prisma, Swagger y Docker
├── sdk/        # SDK Frontend reutilizable en React + TypeScript
├── webapp/     # Web app ejecutada en next js la cual consume el SDK
└── README.md   # Este archivo
```

---

## 🚀 ¿Qué incluye?

- 🧠 **Backend** robusto con arquitectura escalable (Screaming Architecture)
- 📦 **SDK modular y exportable a NPM** (`/sdk`)
- 🧪 **App de ejemplo** en Next js (`/webapp`) que consume el SDK
- 📄 **Swagger/OpenAPI** documentando todos los endpoints
- 🐳 **Docker** para correr la base de datos PostgreSQL sin instalar nada localmente
- 🔐 Seguridad básica, sanitización de datos y posibilidad de añadir autenticación
- 🧬 Semillas automáticas de encuestas para pruebas

---

## ⚙️ Requisitos

- [Docker](https://www.docker.com/)
- [Node.js 18+](https://nodejs.org/)
- Yarn o npm
- Docker Desktop (para visualizar contenedores)

---

## 🐳 Uso con Docker (solo para el backend)

```bash
# Iniciar los contenedores por primera vez
docker compose -f backend/docker-compose.yml up -d --build

# Acceder al contenedor
docker exec -it survey_api_web bash

# Ejecutar migraciones
npx prisma migrate dev --name init

# Ejecutar datos semilla
npx tsx prisma/seed.ts
```

---

## 📘 Documentación API

Una vez el backend esté corriendo:

📄 Swagger disponible en:

```
http://localhost:3000/docs
```

---

## 🧠 Detalles de cada módulo

### 📁 [`/backend`](./backend)

API para gestionar encuestas y respuestas. Incluye:

- Endpoints REST: `/surveys`, `/responses`, `/metrics/:id`
- Base de datos PostgreSQL usando Prisma
- Seeds, validaciones, seguridad básica

📄 [Ver README del backend](./backend/README.md)

---

### 📁 [`/sdk`](./sdk)

SDK frontend exportable y documentado. Expone:

- `SurveyWidget`: componente React reutilizable
- Hooks como `useSurvey`, `useSurveyResponse`
- Tipado fuerte con TypeScript
- Mock data opcional y temas personalizados

📄 [Ver README del SDK](./sdk/README.md)

---

### 📁 [`/webapp`](./webapp)

Aplicacion en next js que consume el SDK como cliente externo.

- Simula la integración en un sistema real
- Diseño simple, claro y funcional

📄 [Ver README de la App](./webapp/README.md)

---

## 📝 Autoría y Licencia

MIT © Jorge Bairon Bermúdez León  
📍 Armenia, Quindío, Colombia  
📧 j.bayron.b@gmail.com  
💼 [linkedin.com/in/jorge-bairon](https://linkedin.com/in/jorge-bairon)
