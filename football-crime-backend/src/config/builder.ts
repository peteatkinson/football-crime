import express, { Router, Request, Response, NextFunction, Express, json } from 'express'
import * as stadiumsController from '@/controllers/stadiums'

class AppBuilder {
  private readonly app: Express

  constructor () {
    // initalise new express instance
    this.app = express()
  }

  /**
   *  Middleware configuration
   * @returns AppBuilder
   */
  withMiddleware (): AppBuilder {
    const bodyParser = json()

    // define request Content-Type
    const contentType = (req: Request, res: Response, next: NextFunction) => {
      res.type('application/json')
      next()
    }

    // // define CORS headers
    const cors = (req: Request, res: Response, next: NextFunction) => {
      res.set('access-control-allow-origin', '*')
      res.set('access-control-allow-headers', '*')
      res.set('access-control-allow-methods', '*')
      next()
    }

    // register the Express Middleware
    this.app.use(bodyParser)
    this.app.use(cors)
    this.app.use(contentType)

    return this
  }

  /**
   * Route configuration
   * @returns AppBuilder
   */
  withRoutes (): AppBuilder {
    const router = Router()
    router.get('/stadiums', stadiumsController.getStadiums)
    this.app.use('/api', router)
    return this
  }

  build () {
    return this.app
  }
}

export default AppBuilder
