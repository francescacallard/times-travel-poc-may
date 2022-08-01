import { Request, Response, NextFunction } from 'express'
import { RESPONSE_VALIDATION_FAILED } from '#@/constants'

export const validateQuery = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query)

    if (error) {
      res.status(RESPONSE_VALIDATION_FAILED.statusCode).send({
        ...RESPONSE_VALIDATION_FAILED,
        error: error.details[0].message,
      })
    } else {
      // Override query with validated and normalized value.
      // Use the default values from the supplied schema.
      req.query = value
      next()
    }
  }
}

export const validateBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, _ } = schema.validate(req.body)

    if (error) {
      res.status(RESPONSE_VALIDATION_FAILED.statusCode).send({
        ...RESPONSE_VALIDATION_FAILED,
        error: error.details[0].message,
      })
    } else {
      next()
    }
  }
}
