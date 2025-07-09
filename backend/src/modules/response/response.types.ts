export interface CreateResponseInput {
  surveyId: number;
  answers: {
    questionId: number;
    answerText?: string;
    optionId?: number;
  }[];
}
