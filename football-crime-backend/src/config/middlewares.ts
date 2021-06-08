import { Request, Response, NextFunction, Express, json } from 'express'

import compression from 'compression'

const compress = compression()

const bodyParser = json()

const cors = (_: Request, res: Response, next: NextFunction) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  next()
}

const contentType = (_: Request, res: Response, next: NextFunction) => {
  res.type('json')
  next()
}

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(compress)
  app.use(cors)
  app.use(contentType)
}
