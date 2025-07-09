import { prisma } from '../../config/prisma'

export class SurveyService {
  async getAllSurveys() {
    return prisma.survey.findMany({
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });
  }

  async getSurveyById(id: number) {
    return prisma.survey.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });
  }
}
