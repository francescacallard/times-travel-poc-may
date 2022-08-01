import 'module-alias/register'

import config from 'config'
import { appSetup } from '#@/server'

const app = appSetup()

// Start the server
const server = app.listen(config.get('port'), () => {
  console.info(`Environment: ${config.get('env')}`)
  console.info(`Listening on port ${config.get('port')}`)
})

// Graceful shutdown the process
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0)
  })
})
