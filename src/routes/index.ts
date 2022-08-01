import { Router } from 'express'
import { loggerMiddleware } from '#@/middlewares/logger'
import { getStatus } from '#@/routes/status'

const router: Router = Router()

// Remove loggerMiddleware as most likely we wouldn't want to log status requests
router.get('/status', [loggerMiddleware], getStatus)

export default router
