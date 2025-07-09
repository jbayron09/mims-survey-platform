import { Request, Response } from 'express';
import { ResponseService } from './response.service';
import { createResponseSchema } from './response.schema';

const responseService = new ResponseService();

export class ResponseController {
  async create(req: Request, res: Response) {
    try {
      const parsed = createResponseSchema.parse(req.body); // 🔐 validación
      const result = await responseService.submitResponse(parsed);
      res.status(201).json(result);
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return res.status(400).json({
          message: 'Validación fallida',
          errors: err.errors
        });
      }

      return res.status(500).json({
        message: 'Error del servidor',
        error: err.message
      });
    }
  }
}
