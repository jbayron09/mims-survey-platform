import { Router } from 'express';
import { SurveyController } from './survey.controller';

const router = Router();
const controller = new SurveyController();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

export default router;
