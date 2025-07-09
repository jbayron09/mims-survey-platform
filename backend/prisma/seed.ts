import { PrismaClient, QuestionType } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanDatabase() {
  console.log('🧹 Cleaning database and resetting sequences...')

  // Elimina todos los datos (respetando dependencias)
  await prisma.responseAnswer.deleteMany()
  await prisma.response.deleteMany()
  await prisma.answerOption.deleteMany()
  await prisma.question.deleteMany()
  await prisma.survey.deleteMany()

  // Reinicia todos los contadores de secuencia de IDs a 1
  await prisma.$executeRawUnsafe(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (
        SELECT sequence_name
        FROM information_schema.sequences
        WHERE sequence_schema = 'public'
      ) LOOP
        EXECUTE 'ALTER SEQUENCE ' || quote_ident(r.sequence_name) || ' RESTART WITH 1';
      END LOOP;
    END $$;
  `)
}

async function seedSurveys() {
  // Encuestas con preguntas y opciones tipadas
  const surveys: {
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

  for (const survey of surveys) {
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

  console.log('Database seeded successfully')
}

async function main() {
  await cleanDatabase()
  await seedSurveys()
}

main()
    .catch((e) => {
      console.error('Error during seeding:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
