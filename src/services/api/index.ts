import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import prices from '@/routes/prices'
import liquidations from '@/routes/liquidations'

const BACKEND_API_PORT = 4001

export default class Api {
  app: any
  constructor (app: any) {
    app.use(morgan('combined', {
      stream: { write: (msg: any) => console.log(msg) }
    }))
    app.use(cors())
    app.use(compression())

    app.use('/v1/prices', prices)
    app.use('/v1/liquidations', liquidations)
    app.use(this.handleError)
    this.app = app
  }

  handleError = (err: any, req: any, res: any, next: any) => {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload)
    } else {
      next(err)
    }
  }

  handleListen = () => {
    console.log(`Listening on port ${BACKEND_API_PORT}!`)
  }

  start = () => {
    this.app.listen(BACKEND_API_PORT, '0.0.0.0', this.handleListen)
  }
}
