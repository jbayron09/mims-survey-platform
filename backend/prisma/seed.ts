import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Elimina todo si ya hay
  await prisma.responseAnswer.deleteMany()
  await prisma.response.deleteMany()
  await prisma.answerOption.deleteMany()
  await prisma.question.deleteMany()
  await prisma.survey.deleteMany()

  // Crear una encuesta
  const survey = await prisma.survey.create({
    data: {
      title: 'Encuesta de Satisfacción del Cliente',
      questions: {
        create: [
          {
            text: '¿Qué te gustó del servicio?',
            type: 'TEXT',
          },
          {
            text: '¿Cómo calificarías nuestro servicio?',
            type: 'MULTIPLE_CHOICE',
            options: {
              create: [
                { text: 'Excelente' },
                { text: 'Bueno' },
                { text: 'Regular' },
                { text: 'Malo' },
              ],
            },
          },
          {
            text: '¿Nos recomendarías?',
            type: 'MULTIPLE_CHOICE',
            options: {
              create: [
                { text: 'Sí, totalmente' },
                { text: 'Tal vez' },
                { text: 'No' },
              ],
            },
          },
        ],
      },
    },
    include: {
      questions: {
        include: { options: true },
      },
    },
  })

  console.log('Encuesta creada con ID:', survey.id)
  console.log('Seed completado')
}

main()
    .catch((e) => {
      console.error('Error en el seed:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
