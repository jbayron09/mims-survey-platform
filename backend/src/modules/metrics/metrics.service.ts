import { prisma } from '../../config/prisma'

export class MetricsService {
  async getSurveyMetrics(surveyId: number) {
    // Carga todas las preguntas de la encuesta
    const questions = await prisma.question.findMany({
      where: { surveyId },
      include: {
        options: true,
        answers: {
          include: { option: true }
        }
      }
    });

    // Procesa métricas
    const metrics = questions.map((q) => {
      if (q.type === 'TEXT') {
        return {
          questionId: q.id,
          questionText: q.text,
          type: q.type,
          responses: q.answers.map((a) => a.answerText).filter(Boolean)
        };
      } else if (q.type === 'MULTIPLE_CHOICE') {
        const counts: Record<number, number> = {};

        // Inicializa conteo
        q.options.forEach((opt) => {
          counts[opt.id] = 0;
        });

        // Cuenta respuestas
        q.answers.forEach((a) => {
          if (a.optionId) {
            counts[a.optionId] += 1;
          }
        });

        return {
          questionId: q.id,
          questionText: q.text,
          type: q.type,
          results: q.options.map((opt) => ({
            optionId: opt.id,
            optionText: opt.text,
            count: counts[opt.id]
          }))
        };
      }
    });

    return metrics;
  }
}
