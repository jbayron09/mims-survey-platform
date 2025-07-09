import { z } from 'zod';

export const createResponseSchema = z.object({
  surveyId: z.number().int().positive(),
  answers: z.array(
      z.object({
        questionId: z.number().int().positive(),
        answerText: z.string().optional().nullable(),
        optionId: z.number().int().positive().optional().nullable()
      })
  )
});
