import { Request, Response } from 'express';
import { SurveyService } from './survey.service';

const surveyService = new SurveyService();

export class SurveyController {
  async getAll(req: Request, res: Response) {
    const surveys = await surveyService.getAllSurveys();
    res.json(surveys);
  }

  async getOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const survey = await surveyService.getSurveyById(id);

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    res.json(survey);
  }
}
