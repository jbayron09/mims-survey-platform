export interface CreateResponseInput {
  surveyId: number;
  answers: {
    questionId: number;
    answerText?: string | null;
    optionId?: number | null;
  }[];
}