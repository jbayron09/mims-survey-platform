import type { CreateResponseInput } from './response.types'
import { prisma } from '../../config/prisma'

export class ResponseService {
  async submitResponse(data: CreateResponseInput) {
    const { surveyId, answers } = data

    // Valida que exista la encuesta
    const survey = await prisma.survey.findUnique({ where: { id: surveyId } })
    if (!survey) throw new Error('Survey not found')

    // Crea la respuesta general
    const response = await prisma.response.create({
      data: {
        surveyId,
        answers: {
          create: answers.map((a) => ({
            questionId: a.questionId,
            answerText: a.answerText,
            optionId: a.optionId ?? null,
          })),
        },
      },
      include: { answers: true },
    })

    return response
  }
}
