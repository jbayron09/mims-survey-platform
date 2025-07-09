import type { SurveySDKConfig } from "../types"

export class APIClient {
  private baseUrl: string
  private timeout: number
  private retryAttempts: number
  private useMockData: boolean

  constructor(config: SurveySDKConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "")
    this.timeout = config.timeout || 10000
    this.retryAttempts = config.retryAttempts || 3
    this.useMockData = config.useMockData || false
  }

  private async fetchWithRetry<T>(url: string, options: RequestInit = {}, attempt = 1): Promise<T> {
    // Si usamos datos mock, devolver datos de prueba
    if (this.useMockData) {
      return this.getMockData<T>(url, options.method || "GET")
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)

      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        await this.delay(Math.pow(2, attempt) * 1000)
        return this.fetchWithRetry<T>(url, options, attempt + 1)
      }

      throw error
    }
  }

  private async getMockData<T>(url: string, method: string): Promise<T> {
    // Simular delay de red
    await this.delay(800 + Math.random() * 1200)

    if (url === "/surveys") {
      return [
        {
          id: 1,
          title: "Customer Satisfaction Survey",
          createdAt: "2024-01-15T10:00:00Z",
          questions: [],
        },
        {
          id: 2,
          title: "Product Feedback Survey",
          createdAt: "2024-01-16T14:30:00Z",
          questions: [],
        },
      ] as T
    }

    if (url.match(/\/surveys\/\d+$/)) {
      const surveyId = Number.parseInt(url.split("/").pop() || "1")
      return {
        id: surveyId,
        title: surveyId === 1 ? "Customer Satisfaction Survey" : "Product Feedback Survey",
        createdAt: "2024-01-15T10:00:00Z",
        questions: [
          {
            id: 1,
            text: "How satisfied are you with our service?",
            type: "MULTIPLE_CHOICE",
            surveyId: surveyId,
            options: [
              { id: 1, text: "Very Satisfied", questionId: 1 },
              { id: 2, text: "Satisfied", questionId: 1 },
              { id: 3, text: "Neutral", questionId: 1 },
              { id: 4, text: "Dissatisfied", questionId: 1 },
              { id: 5, text: "Very Dissatisfied", questionId: 1 },
            ],
          },
          {
            id: 2,
            text: "What can we improve?",
            type: "TEXT",
            surveyId: surveyId,
            options: [],
          },
          {
            id: 3,
            text: "Would you recommend us to others?",
            type: "MULTIPLE_CHOICE",
            surveyId: surveyId,
            options: [
              { id: 6, text: "Definitely", questionId: 3 },
              { id: 7, text: "Probably", questionId: 3 },
              { id: 8, text: "Not sure", questionId: 3 },
              { id: 9, text: "Probably not", questionId: 3 },
              { id: 10, text: "Definitely not", questionId: 3 },
            ],
          },
        ],
      } as T
    }

    if (method === "POST" && url === "/responses") {
      return { success: true, message: "Response submitted successfully" } as T
    }

    if (url.match(/\/metrics\/\d+$/)) {
      return [
        {
          questionId: 1,
          questionText: "¿Qué te gustó del servicio?",
          type: "TEXT",
          responses: [
            "Me encantó la rapidez del servicio",
            "El personal fue muy amable",
            "Excelente atención al cliente",
            "Todo estuvo perfecto",
            "Muy profesionales",
          ],
        },
        {
          questionId: 2,
          questionText: "¿Cómo calificarías nuestro servicio?",
          type: "MULTIPLE_CHOICE",
          results: [
            { optionId: 1, optionText: "Excelente", count: 45 },
            { optionId: 2, optionText: "Bueno", count: 32 },
            { optionId: 3, optionText: "Regular", count: 12 },
            { optionId: 4, optionText: "Malo", count: 8 },
            { optionId: 5, optionText: "Muy Malo", count: 3 },
          ],
        },
        {
          questionId: 3,
          questionText: "¿Nos recomendarías?",
          type: "MULTIPLE_CHOICE",
          results: [
            { optionId: 6, optionText: "Sí, totalmente", count: 38 },
            { optionId: 7, optionText: "Tal vez", count: 28 },
            { optionId: 8, optionText: "No estoy seguro", count: 15 },
            { optionId: 9, optionText: "Probablemente no", count: 12 },
            { optionId: 10, optionText: "Definitivamente no", count: 7 },
          ],
        },
      ] as T
    }

    throw new Error(`Mock data not available for ${url}`)
  }

  private shouldRetry(error: any): boolean {
    return error.name === "AbortError" || error.message.includes("fetch") || error.message.includes("network")
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async get<T>(url: string): Promise<T> {
    return this.fetchWithRetry<T>(url, { method: "GET" })
  }

  async post<T>(url: string, data: any): Promise<T> {
    return this.fetchWithRetry<T>(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}
