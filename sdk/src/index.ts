// Punto de entrada principal del SDK
export { SurveyWidget } from "./components/SurveyWidget"
export { SurveyProvider, useSurveyContext } from "./context/SurveyProvider"
export { useSurvey } from "./hooks/useSurvey"
export { useSurveyResponse } from "./hooks/useSurveyResponse"
export { LoadingSpinner } from "./components/ui/LoadingSpinner"
export { ErrorBoundary } from "./components/ui/ErrorBoundary"
export { EmptyState } from "./components/ui/EmptyState"

export type {
  Survey,
  Question,
  AnswerOption,
  CreateResponseInput,
  QuestionMetrics,
  SurveySDKConfig,
  SurveyWidgetProps,
} from "./types"
