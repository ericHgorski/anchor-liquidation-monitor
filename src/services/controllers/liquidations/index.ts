import observer from '../../sockets'

const handleGetReq = {}

handleGetReq['/'] = async (req: any, res: any, next: any) => {
  try {
    const collat = observer.getBorrowStableEvents()
    res.send(collat)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// would add handler here if func not found in controller
export const getRequestHandler = (handelFuncName: string) => handleGetReq[handelFuncName]
