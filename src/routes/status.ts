import { Request, Response } from 'express'
import { RESPONSE_OK } from '#@/constants'

export const getStatus = async (_req: Request, res: Response) => {
  return res.status(RESPONSE_OK.statusCode).send(RESPONSE_OK.message)
}
