import { Router } from 'express'
import { ResponseController } from './response.controller'

const router = Router()
const controller = new ResponseController()

router.post('/', controller.create)

export default router
