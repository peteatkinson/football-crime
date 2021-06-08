
/**
 * Middlware imports
 */
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import express from 'express'

const app = express()

// Express configuration
setupMiddlewares(app)
setupRoutes(app)

export default app
