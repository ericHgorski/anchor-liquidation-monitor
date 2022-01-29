import WebSocket from 'ws'

class Observer {
  socket: any
  socketUrl: string
  blockData: any
  constructor (socketUrl: string) {
    this.socket = new WebSocket(socketUrl)
    this.socketUrl = socketUrl
    this.blockData
  }

  start = () => {
    this.socket.onopen = () => {
      console.log(`Subscribing to ${this.socketUrl}`)
      this.blockData = []
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
      const { data } = JSON.parse(msg[dataSym])
      // would push object constructed as { blockHeight: blockData } instead of nested arrays
      this.blockData.push(data)
    } catch (err) {
      console.error('Err handling msg:', err)
    }
   
  }
  getBlockData = () => {
    // parse the events to extract relevant data and return it, this function can than be called from the endpoint
    // to update liquidation volume at given price points
    return this.blockData.length
  }
  // parse exchange rates event from most recent block to get up to date price info
  getLunaPrice = () => {}
  getBlockHeight = () => 6271165 // get most recent blockheight
}
const observer = new Observer('wss://observer.terra.dev')
export default observer

