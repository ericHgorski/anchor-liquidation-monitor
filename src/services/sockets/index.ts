import WebSocket from 'ws'

class Observer {
  socket: any
  constructor (socket: any) {
    this.socket = socket
 }

  start = () => {
    this.socket.onopen = () => {
      console.log('connected to websocket. subscribing...')
      this.socket.send(JSON.stringify({subscribe: 'new_block', chain_id: 'columbus-4'})) // not columbus 5?
      console.log('this.socket', this.socket)
    }
    this.socket.onmessage = (msg: any) => {
      console.log('msg', msg)
      this.handleMsg(msg)
    }
    this.socket.onclose = () => {
      console.log('websocket closed. reopening...')
      setTimeout(() => { this.start() }, 1000)
    }
  }
  handleMsg = (msg: any) => {
    const dataSym = Object.getOwnPropertySymbols(msg)[2] // retrieve data from ws response
    const blockData = JSON.parse(msg[dataSym])
    const { txs } = blockData.data
    console.log('txs', txs);
    for (const { events } of txs) {
      console.log('events', events);
      const borrowStableCall = events.value.execute_msg.borrow_stable
      if (borrowStableCall) {
        console.log('borrowStableCall', borrowStableCall);
      }
    }
  }
  getBorrowStableEvents = () => this.socket.borrowStableEvents
}

const observerSocket = new WebSocket('wss://observer.terra.dev')
const observer = new Observer(observerSocket)
export default observer