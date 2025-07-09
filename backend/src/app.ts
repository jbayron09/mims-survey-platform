import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import surveyRouter from './modules/survey/survey.router'
import responseRouter from './modules/response/response.router'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Rutas de API
app.use('/api/surveys', surveyRouter)
app.use('/api/responses', responseRouter)

export default app
