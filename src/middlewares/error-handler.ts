import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { RESPONSE_SERVER_ERROR, RESPONSE_UNAUTHORIZED } from '#@/constants'

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`${res.statusCode} ${err.message} ${err.stack} ${req.url}`)

  if (err.name === 'UnauthorizedError') {
    res.status(RESPONSE_UNAUTHORIZED.statusCode).send(RESPONSE_UNAUTHORIZED)
  } else {
    res.status(RESPONSE_SERVER_ERROR.statusCode).send(RESPONSE_SERVER_ERROR)
  }
}
