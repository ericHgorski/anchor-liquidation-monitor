import Api from './services/api'
import express from 'express'
import WebSocket from 'ws'

const socket = new WebSocket('wss://observer.terra.dev')

const initSocket = () => {
  console.log('main was called')
  socket.onopen = () => {
    console.log('connected to websocket. subscribing...')
    // subscribe to new_block events
    socket.send(JSON.stringify({subscribe: "new_block", chain_id: "columbus-5"}))
  }
  socket.onmessage = (message: string) => {
    console.log('message', message)
  }
  socket.onclose = () => {
    console.log('websocket closed. reopening...')
    setTimeout(() => { initSocket() }, 1000)
  }
}


const app = express()
const api = new Api(app)
initSocket()
api.start()
