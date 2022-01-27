import cors from 'cors'
import compression from 'compression'
import prices from '../routes/prices'
import liquidations from '../routes/liquidations'

const BACKEND_API_PORT = 4001

export class Api {
  app: any
  constructor (app: any) {
    app.use(cors())
    app.use(compression())
    app.use('/prices', prices)
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

export class ws {
  socket: any
  constructor (socket: any) {
    this.socket = socket
  }

  start = () => {
    let msgCount = 0
    this.socket.onopen = () => {
      console.log('connected to websocket. subscribing...')
      this.socket.send(JSON.stringify({subscribe: "new_block", chain_id: "columbus-5"}))
    }
    this.socket.onmessage = (message: any) => {
      if (msgCount > 0) { return }
      const dataSym = Object.getOwnPropertySymbols(message)[2] // retrieve data from ws response
      this.handleMessage(JSON.parse(message[dataSym]))
      msgCount++
    }
    this.socket.onclose = () => {
      console.log('websocket closed. reopening...')
      setTimeout(() => { this.start() }, 1000)
    }
  }
  handleMessage = (msg: any) => {
    console.log('msg', msg)
  }
}
