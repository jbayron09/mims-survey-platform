#  🚀 Plataforma de Gestión de Encuestas

Una aplicación web moderna construida con Next.js 14 que demuestra el uso del Survey SDK para crear, gestionar y analizar encuestas con métricas en tiempo real.

## ✨ Características Principales

- 🎯 **Interfaz Intuitiva** - Diseño moderno y fácil de usar
- 📊 **Analytics Avanzados** - Métricas detalladas con visualizaciones
- 📱 **Responsive Design** - Optimizado para todos los dispositivos
- ⚡ **Performance Optimizada** - Carga rápida y navegación fluida
- 🛡️ **Manejo de Errores** - Estados de error elegantes y recuperación
- 🎨 **UI/UX Profesional** - Componentes pulidos con Tailwind CSS
- 🔄 **Estados de Carga** - Feedback visual durante operaciones
- 🌐 **Accesibilidad** - Cumple estándares WCAG

## 📦 Tecnologías Usadas

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **@company/survey-sdk**

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/jbayron09/mims-survey-platform
cd mims-survey-platform/webapp
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env` en la raíz de la carpeta `webapp`:

```bash
touch .env
```

Agrega lo siguiente:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ROLL=prod
```

> 🔐 **Importante**: Las variables sensibles como tokens de autenticación o claves API no deben subirse a Git. Estas serán enviadas por correo por motivos de seguridad.

4. Corre la app en modo desarrollo:

```bash
npm run dev
```

## 🧪 Modo Mock (Sin Backend)

Durante el desarrollo puedes habilitar el uso de datos mock si estás usando `NODE_ENV=development`. El SDK lo detectará automáticamente.

```ts
const sdkConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  useMockData: process.env.NODE_ENV === "development",
  ...
}
```

## 📁 Estructura

```
app/
├── components/           # Componentes reutilizables
│   ├── layout/          # Componentes de layout
│   │   ├── Header.tsx   # Navegación principal
│   │   └── Footer.tsx   # Pie de página
│   ├── sections/        # Secciones de página
│   │   ├── HeroSection.tsx
│   │   └── FeaturesSection.tsx
│   └── ui/              # Componentes base
├── surveys/             # Rutas de encuestas
│   ├── page.tsx         # Lista de encuestas
│   └── [id]/           # Encuesta específica
│       ├── page.tsx     # Widget de encuesta
│       └── metrics/     # Analytics
│           └── page.tsx # Dashboard de métricas
├── globals.css          # Estilos globales
├── layout.tsx           # Layout raíz
├── page.tsx            # Página principal
├── loading.tsx         # UI de carga global
└── error.tsx           # UI de error global
```

## 🎯 Funcionalidades

### 🏠 Página Principal
- Hero section con llamadas a la acción
- Sección de características destacadas
- Acceso rápido a encuestas y analytics
- Navegación intuitiva

### 📋 Lista de Encuestas (/surveys)
- Vista de todas las encuestas disponibles
- Cards informativas con metadatos
- Acceso directo a encuestas y métricas
- Estados de carga y error elegantes

### 📝 Widget de Encuesta (/surveys/[id])
- Integración completa del Survey SDK
- Preguntas de texto y opción múltiple
- Validación en tiempo real
- Confirmación de envío exitoso
- Manejo robusto de errores

### 📊 Dashboard de Analytics (/surveys/[id]/metrics)
- Métricas detalladas por pregunta
- Visualizaciones con barras de progreso
- Estadísticas generales de respuestas
- Respuestas de texto organizadas
- Porcentajes y conteos automáticos

## 📱 Responsive Design

La aplicación está optimizada para todos los dispositivos:

- **Mobile First** - Diseño que prioriza móviles
- **Breakpoints** - sm, md, lg, xl, 2xl
- **Navegación Adaptativa** - Menú hamburguesa en móvil
- **Grids Responsivos** - Layouts que se adaptan
- **Tipografía Escalable** - Tamaños que se ajustan

## ⚡ Optimizaciones de Performance

### Next.js 14 Features
- **App Router** - Routing optimizado
- **Server Components** - Renderizado del servidor
- **Image Optimization** - Imágenes optimizadas automáticamente
- **Font Optimization** - Carga optimizada de fuentes

### Estrategias Implementadas
- **Code Splitting** - Carga bajo demanda
- **Lazy Loading** - Componentes diferidos
- **Memoization** - Prevención de re-renders
- **Error Boundaries** - Aislamiento de errores

## 🛡️ Manejo de Errores
### Estados de Error Específicos
- **404** - Páginas no encontradas
- **500** - Errores del servidor
- **Network** - Problemas de conectividad
- **Validation** - Errores de validación

## 🧠 Notas Finales

- Esta aplicación **no implementa la creación de encuestas**, ya que el alcance se limita al consumo del SDK.
- El SDK puede operar con datos reales o simulados, ideal para entornos de pruebas o desarrollo offline.

📝 Licencia y Autoría
MIT © Jorge Bairon Bermúdez León 📍 Armenia, Quindío, Colombia 📧 j.bayron.b@gmail.com 💼 linkedin.com/in/jorge-bairon

