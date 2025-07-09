# 🧠 Survey API – Backend

Backend robusto y escalable para la gestión de encuestas, respuestas y métricas, desarrollado con **Node.js**, **Express**, **TypeScript** y **Prisma ORM**. Este servicio expone una API RESTful documentada con **Swagger/OpenAPI** y contiene endpoints seguros, validados y listos para producción.

---

## 🚀 Características

- 🔐 Validación y sanitización de datos
- 📄 Documentación Swagger (OpenAPI 3.0)
- 🗃️ ORM con Prisma y PostgreSQL
- 🐳 Contenedorización con Docker
- 🧪 Seeds de datos iniciales para pruebas
- 📊 Endpoint de métricas por encuesta
- ⚙️ Arquitectura escalable inspirada en NestJS / Screaming Architecture

---

## 🧱 Tecnologías

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (Dockerizado)
- Swagger UI
- Zod (validación de entradas)
- Docker + Docker Compose

---

## 🔧 Variables de entorno

El backend utiliza un archivo `.env` para configurar los servicios:

```
DATABASE_URL="postgresql://postgres:postgres@db:5432/surveys"
PORT=3000
```

---

---

## 📦 Instalación

### 🐳 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📁 Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mims-survey-platform.git
cd mims-survey-platform/backend
```

---

## 🛠️ Uso con Docker

### 🔨 Inicializar contenedores por primera vez:

```bash
docker compose -f docker-compose.yml up -d --build
```

### ♻️ Para reconstruir contenedores modificados:

```bash
docker-compose up -d --build
```

Esto iniciará:

- `survey_api_web`: el backend en `http://localhost:3000`
- `survey_api_db`: base de datos PostgreSQL

---

## 🧬 Migraciones y Datos Semilla

### 🐚 Acceder al contenedor del backend:

```bash
docker exec -it survey_api_web bash
```

### 🧱 Ejecutar migraciones:

```bash
npx prisma migrate dev --name init
```

### 🌱 Cargar datos semilla:

```bash
npx tsx prisma/seed.ts
```

---

## 🌱 Encuestas Semilla (en inglés)

```json
[
  {
    "title": "Customer Satisfaction Survey",
    "questions": [
      {
        "text": "What did you like most about our service?",
        "type": "TEXT"
      },
      {
        "text": "How would you rate your experience?",
        "type": "MULTIPLE_CHOICE",
        "options": ["Excellent", "Good", "Average", "Poor"]
      },
      {
        "text": "Would you recommend us to others?",
        "type": "MULTIPLE_CHOICE",
        "options": ["Definitely", "Maybe", "No"]
      }
    ]
  },
  {
    "title": "Product Feedback Survey",
    "questions": [
      {
        "text": "How often do you use the product?",
        "type": "MULTIPLE_CHOICE",
        "options": ["Daily", "Weekly", "Monthly", "Rarely"]
      },
      {
        "text": "What feature do you use the most?",
        "type": "TEXT"
      },
      {
        "text": "How can we improve?",
        "type": "TEXT"
      }
    ]
  },
  {
    "title": "Event Experience Survey",
    "questions": [
      {
        "text": "How satisfied were you with the event?",
        "type": "MULTIPLE_CHOICE",
        "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"]
      },
      {
        "text": "What was your favorite part?",
        "type": "TEXT"
      },
      {
        "text": "Would you attend again?",
        "type": "MULTIPLE_CHOICE",
        "options": ["Yes", "Not Sure", "No"]
      }
    ]
  }
]
```

---

## 📖 Documentación Swagger

La API está completamente documentada y disponible en:

```
http://localhost:3000/docs
```

> Esquema compatible con OpenAPI 3.0 para facilitar la integración con Postman, SDKs, y herramientas externas.

---

## 🔐 Seguridad

- Todas las entradas son validadas con Zod
- CORS habilitado para consumo desde frontend
- Respuestas tipadas y controladas
- Posibilidad de añadir autenticación JWT o middleware de roles fácilmente

---

## 📈 Endpoints Disponibles

| Método | Ruta                   | Descripción                       |
|--------|------------------------|-----------------------------------|
| GET    | `/api/surveys`         | Lista de encuestas                |
| GET    | `/api/surveys/:id`     | Encuesta con preguntas            |
| POST   | `/api/responses`       | Guardar respuestas de usuario     |
| GET    | `/api/metrics/:id`     | Métricas de respuestas por encuesta |

---

## 📁 Estructura del proyecto

```
backend/
├── prisma/                   # Esquema de Prisma y semillas
│   └── schema.prisma
│   └── seed.ts
├── src/
│   ├── common/               # Configuración y utilidades comunes
│   │   ├── config/
│   │   │   └── swagger.json
│   │   └── prisma.ts
│   ├── modules/              # Módulos funcionales
│   │   ├── metrics/
│   │   │   ├── metrics.controller.ts
│   │   │   ├── metrics.router.ts
│   │   │   └── metrics.service.ts
│   │   ├── response/
│   │   │   ├── response.controller.ts
│   │   │   ├── response.router.ts
│   │   │   ├── response.schema.ts
│   │   │   ├── response.service.ts
│   │   │   └── response.types.ts
│   │   └── survey/
│   │       ├── survey.controller.ts
│   │       ├── survey.router.ts
│   │       ├── survey.schema.ts
│   │       ├── survey.service.ts
│   │       └── survey.types.ts
│   ├── app.ts                # Inicialización de Express y rutas
│   └── index.ts              # Entry point
├── .env                      # Variables de entorno
├── docker-compose.yml        # Docker para PostgreSQL
└── README.md                 # Este archivo
```

---

## 📝 Licencia y Autoría
MIT © Jorge Bairon Bermúdez León
📍 Armenia, Quindío, Colombia
📧 j.bayron.b@gmail.com
💼 linkedin.com/in/jorge-bairon
