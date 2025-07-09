import { Router } from 'express';
import { MetricsController } from './metrics.controller';

const router = Router();
const controller = new MetricsController();

router.get('/:id', controller.getMetrics);

export default router;
