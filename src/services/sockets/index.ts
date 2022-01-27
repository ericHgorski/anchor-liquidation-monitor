import WebSocket from 'ws'
// import { unmarshalTx } from '@tendermint/amino-js'

class Observer {
  socket: any
  socketUrl: string
  events: any
  constructor (socketUrl: string) {
    this.socket = new WebSocket(socketUrl)
    this.socketUrl = socketUrl
    this.events = []
  }

  start = () => {
    this.socket.onopen = () => {
      console.log(`Subscribing to ${this.socketUrl}`)
      this.socket.send(JSON.stringify({ subscribe: 'new_block', chain_id: 'columbus-5' })) // using columbus-5 instead of 4
    }

    this.socket.onmessage = (msg: any) => {
      this.handleMsg(msg)
    }
    
    this.socket.onclose = () => {
      console.log(` ${this.socketUrl} socket has closed. attempting reconnect...`)
      setTimeout(() => { this.start() }, 1000)
    }
  }
  handleMsg = (msg: any) => {
    try {
      const dataSym = Object.getOwnPropertySymbols(msg)[2] // retrieve data key from msg
      const block = JSON.parse(msg[dataSym])
      for (const { logs } of block.data) {
        // filter logs for relevant event types (e.g. borrow_stable), parse and 
        // use them modify value of observer object properties
        this.events.push(logs)
      }
    } catch (err) {
      console.error('Err handling msg:', err)
    }
   
  }
  getParsedEvents = () => {
    // parse the events to extract relevant data and return it, this function can than be called from the endpoint t
    // o update liquidation volume at given price points
    return this.events
  }
}
const observer = new Observer('wss://observer.terra.dev')
export default observer

