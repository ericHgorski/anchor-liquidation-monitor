import cors from 'cors'
import compression from 'compression'
import totals from '@/services/routes/totals'
import liquidations from '@/services/routes/liquidations'
import express from 'express'

const BACKEND_API_PORT = 4001

class Api {
  app: any
  constructor (app: any) {
    app.use(cors())
    app.use(compression())
    app.use('/totals', totals)
    app.use('/liquidations', liquidations)
    app.use(this.handleError)
    this.app = app
  }

  handleError = (err: any, req: any, res: any, next: any) => {
    if (err) {
      return res.status(err.output.statusCode).json(err.output.payload)
    } else {
      next(err)
    }
  }

  handleListen = () => { console.log(`Listening on port ${BACKEND_API_PORT}`)}
  start = () => { this.app.listen(BACKEND_API_PORT, '0.0.0.0', this.handleListen) }
}

const app = express()
const api = new Api(app)

export default api