// import observer from "@/services/sockets"
import { lcd, addressProvider } from '@/services/clients'
import { queryMarketBorrowerInfos, MARKET_DENOMS } from '@anchor-protocol/anchor.js'

const handleGetReq = {}

handleGetReq['/'] = async (req: any, res: any, next: any) => {
  try {
    const liabilities = await queryMarketBorrowerInfos({
      lcd,
      market: MARKET_DENOMS.UUSD,
      limit: 10000
    })(addressProvider)
    // use queryMarketBorrowerInfos to query borrow infos
    // const eventUpdates = observer.getParsedEvents()
    res.send(liabilities)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// would add handler here if func not found in controller
export const getRequestHandler = (handelFuncName: string) => handleGetReq[handelFuncName]
