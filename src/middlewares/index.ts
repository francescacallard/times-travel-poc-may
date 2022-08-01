import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Application } from 'express'
import authentication from '#@/middlewares/authentication'

export const middlewares = (app: Application) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
  app.use(authentication)
}
