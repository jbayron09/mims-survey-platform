
# 📊 Survey SDK - React TypeScript

Un SDK moderno y robusto para integrar encuestas en aplicaciones React con soporte completo de TypeScript.

## ✨ Características Principales

- 🚀 **Fácil Integración** - Componente React plug-and-play
- 🛡️ **TypeScript Nativo** - Tipado fuerte y autocompletado
- 🔄 **Manejo de Estados** - Loading, error y success states
- 🎨 **Totalmente Personalizable** - Temas light/dark y CSS personalizado
- 📱 **Responsive Design** - Optimizado para móvil y desktop
- ⚡ **Performance** - Retry automático y cache inteligente
- 🌐 **Accesibilidad** - ARIA labels y navegación por teclado
- 🧪 **Datos Mock** - Funciona sin backend para desarrollo

## 🛠️ Tecnologías Utilizadas

- **React 18+** - Hooks modernos y Suspense
- **TypeScript 5+** - Tipado estricto
- **Tailwind CSS** - Estilos utilitarios
- **Context API** - Gestión de estado global
- **Error Boundaries** - Manejo robusto de errores
- **Fetch API** - Cliente HTTP con retry automático

## 📦 Instalación

```bash
npm install @company/survey-sdk
# o
yarn add @company/survey-sdk
# o
pnpm add @company/survey-sdk
```

## 🏗️ Construcción del SDK

Para construir el paquete y generar la carpeta `dist` (requerida para importar correctamente):

```bash
npm install
npm run build
```

## 🚀 Uso Básico

### 1. Configurar el Provider

```tsx
import { SurveyProvider } from '@company/survey-sdk'

const config = {
  baseUrl: 'https://tu-api.com/api',
  timeout: 10000,
  retryAttempts: 3,
  useMockData: false // true para desarrollo sin backend
}

function App() {
  return (
    <SurveyProvider config={config}>
      {/* Tu aplicación */}
    </SurveyProvider>
  )
}
```

### 2. Usar el Componente SurveyWidget

```tsx
import { SurveyWidget } from '@company/survey-sdk'

function MiComponente() {
  const handleComplete = (responses) => {
    console.log('Encuesta completada:', responses)
    // Manejar respuestas completadas
  }

  const handleError = (error) => {
    console.error('Error en encuesta:', error)
    // Manejar errores
  }

  return (
    <SurveyWidget
      surveyId={1}
      onComplete={handleComplete}
      onError={handleError}
      theme="light"
      className="mi-clase-personalizada"
    />
  )
}
```

## 📋 API Reference

### SurveyProvider Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `config` | `SurveySDKConfig` | Configuración del SDK |
| `children` | `ReactNode` | Componentes hijos |

### SurveyWidget Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `surveyId` | `number` | - | ID de la encuesta a mostrar |
| `onComplete` | `(responses) => void` | - | Callback al completar encuesta |
| `onError` | `(error) => void` | - | Callback de manejo de errores |
| `theme` | `'light' \| 'dark'` | `'light'` | Tema visual |
| `className` | `string` | `''` | Clases CSS adicionales |

### SurveySDKConfig

```typescript
interface SurveySDKConfig {
  baseUrl: string           // URL base de tu API
  timeout?: number          // Timeout en ms (default: 10000)
  retryAttempts?: number    // Intentos de retry (default: 3)
  useMockData?: boolean     // Usar datos mock (default: false)
}
```

## 🎯 Hooks Disponibles

### useSurvey

```tsx
import { useSurvey } from '@company/survey-sdk'

function MiComponente() {
  const { survey, loading, error, refetch } = useSurvey(surveyId)

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{survey?.title}</div>
}
```

### useSurveyResponse

```tsx
import { useSurveyResponse } from '@company/survey-sdk'

function MiComponente() {
  const { submitResponse, loading, success, error } = useSurveyResponse()

  const handleSubmit = async () => {
    await submitResponse({
      surveyId: 1,
      answers: [
        { questionId: 1, answerText: "Mi respuesta" },
        { questionId: 2, optionId: 3 }
      ]
    })
  }

  return (
    <button onClick={handleSubmit} disabled={loading}>
      {loading ? 'Enviando...' : 'Enviar Respuestas'}
    </button>
  )
}
```

## 📊 Tipos de Datos

```ts
interface Survey {
  id: number
  title: string
  createdAt: string
  questions: Question[]
}

interface Question {
  id: number
  text: string
  type: "TEXT" | "MULTIPLE_CHOICE"
  surveyId: number
  options: AnswerOption[]
}

interface CreateResponseInput {
  surveyId: number
  answers: {
    questionId: number
    answerText?: string | null
    optionId?: number | null
  }[]
}
```

## 🔧 Desarrollo y Variables de Entorno

Este SDK no requiere archivo `.env`, sin embargo debe ser compilado antes de ser usado con `npm run build`.

## 📝 Licencia y Autoría
MIT © Jorge Bairon Bermúdez León
📍 Armenia, Quindío, Colombia
📧 j.bayron.b@gmail.com
💼 linkedin.com/in/jorge-bairon


