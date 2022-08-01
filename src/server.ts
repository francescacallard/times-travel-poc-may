import express, { Application } from 'express'
import { middlewares } from '#@/middlewares'
import routes from '#@/routes'
import { errorHandler } from '#@/middlewares/error-handler'

export const appSetup = () => {
  const app: Application = express()

  middlewares(app)

  app.use(routes)
  app.use(errorHandler)

  return app
}
