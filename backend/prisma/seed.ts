import { PrismaClient, QuestionType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.responseAnswer.deleteMany()
  await prisma.response.deleteMany()
  await prisma.answerOption.deleteMany()
  await prisma.question.deleteMany()
  await prisma.survey.deleteMany()

  // Encuestas con preguntas y opciones tipadas
  const surveysData: {
    title: string
    questions: {
      text: string
      type: QuestionType
      options?: string[]
    }[]
  }[] = [
    {
      title: 'Customer Satisfaction Survey',
      questions: [
        {
          text: 'What did you like most about our service?',
          type: 'TEXT',
        },
        {
          text: 'How would you rate your experience?',
          type: 'MULTIPLE_CHOICE',
          options: ['Excellent', 'Good', 'Average', 'Poor'],
        },
        {
          text: 'Would you recommend us to others?',
          type: 'MULTIPLE_CHOICE',
          options: ['Definitely', 'Maybe', 'No'],
        },
      ],
    },
    {
      title: 'Product Feedback Survey',
      questions: [
        {
          text: 'How often do you use the product?',
          type: 'MULTIPLE_CHOICE',
          options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
        },
        {
          text: 'What feature do you use the most?',
          type: 'TEXT',
        },
        {
          text: 'How can we improve?',
          type: 'TEXT',
        },
      ],
    },
    {
      title: 'Event Experience Survey',
      questions: [
        {
          text: 'How satisfied were you with the event?',
          type: 'MULTIPLE_CHOICE',
          options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
        },
        {
          text: 'What was your favorite part?',
          type: 'TEXT',
        },
        {
          text: 'Would you attend again?',
          type: 'MULTIPLE_CHOICE',
          options: ['Yes', 'Not Sure', 'No'],
        },
      ],
    },
  ]

  // Crear encuestas con validación tipada
  for (const survey of surveysData) {
    await prisma.survey.create({
      data: {
        title: survey.title,
        questions: {
          create: survey.questions.map((q) => ({
            text: q.text,
            type: q.type,
            ...(q.options && {
              options: {
                create: q.options.map((opt) => ({ text: opt })),
              },
            }),
          })),
        },
      },
    })
  }

  console.log('Seed completed successfully')
}

main()
    .catch((e) => {
      console.error('Error during seeding:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
