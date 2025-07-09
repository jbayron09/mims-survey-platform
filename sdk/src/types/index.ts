// Tipos principales del SDK
export interface Survey {
  id: number
  title: string
  createdAt: string
  questions: Question[]
}

export interface Question {
  id: number
  text: string
  type: "TEXT" | "MULTIPLE_CHOICE"
  surveyId: number
  options: AnswerOption[]
}

export interface AnswerOption {
  id: number
  text: string
  questionId: number
}

export interface CreateResponseInput {
  surveyId: number
  answers: {
    questionId: number
    answerText?: string | null
    optionId?: number | null
  }[]
}

export interface QuestionMetrics {
  questionId: number
  questionText: string
  type: "TEXT" | "MULTIPLE_CHOICE"
  responses?: string[]
  results?: {
    optionId: number
    optionText: string
    count: number
  }[]
}

export interface SurveySDKConfig {
  baseUrl: string
  timeout?: number
  retryAttempts?: number
  useMockData?: boolean
}

export interface SurveyWidgetProps {
  surveyId: number
  onComplete?: (responses: CreateResponseInput) => void
  onError?: (error: Error) => void
  className?: string
  theme?: "light" | "dark"
}
