import { Request, Response } from 'express';
import { MetricsService } from './metrics.service';

const metricsService = new MetricsService();

export class MetricsController {
  async getMetrics(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await metricsService.getSurveyMetrics(id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ message: 'Error al obtener métricas', error: err.message });
    }
  }
}
