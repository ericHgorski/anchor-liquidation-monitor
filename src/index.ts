import { Api, ws } from './services/api'
import express from 'express'
import WebSocket from 'ws'

const app = express()
const api = new Api(app)
const socket = new ws(new WebSocket('wss://observer.terra.dev'))
socket.start()
api.start()
