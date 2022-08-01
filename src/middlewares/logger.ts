import { Request, Response, NextFunction } from 'express'

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { path, query, headers, body } = req

  console.info('Request:', { path, query, headers, body })
  next()
}
