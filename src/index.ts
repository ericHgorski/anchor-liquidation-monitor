import Api from './services/api'
import observer from './services/sockets'
import express from 'express'

const app = express()
const api = new Api(app)

observer.start()
api.start()
