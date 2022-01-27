import observer from "@/services/sockets"

const handleGetReq = {}

handleGetReq['/'] = async (req: any, res: any, next: any) => {
  try {
    const stuff = observer.getParsedEvents()
    res.send(stuff)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// would add handler here if func not found in controller
export const getRequestHandler = (handelFuncName: string) => handleGetReq[handelFuncName]
