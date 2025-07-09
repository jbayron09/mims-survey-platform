import type { APIClient } from "./client"
import type { Survey, CreateResponseInput, QuestionMetrics } from "../types"

export class SurveyAPI {
  constructor(private client: APIClient) {}

  async getSurveys(): Promise<Survey[]> {
    return this.client.get<Survey[]>("/surveys")
  }

  async getSurvey(id: number): Promise<Survey> {
    return this.client.get<Survey>(`/surveys/${id}`)
  }

  async submitResponse(response: CreateResponseInput): Promise<void> {
    return this.client.post<void>("/responses", response)
  }

  async getMetrics(surveyId: number): Promise<QuestionMetrics[]> {
    return this.client.get<QuestionMetrics[]>(`/metrics/${surveyId}`)
  }
}
