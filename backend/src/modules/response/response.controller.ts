import { Request, Response } from 'express'
import { ResponseService } from './response.service'

const responseService = new ResponseService()

export class ResponseController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body
      const result = await responseService.submitResponse(data)
      res.status(201).json(result)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  }
}
