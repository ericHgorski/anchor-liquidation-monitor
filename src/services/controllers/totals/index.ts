// import observer from "@/services/sockets"
import { lcd, addressProvider } from '@/services/clients'
import { MARKET_DENOMS } from '@anchor-protocol/anchor.js'
import axios from 'axios'
import { getLiquidationInfo } from '@/utils/util'
import { queryMarketBorrowerInfos } from '@anchor-protocol/anchor.js'
const ANCHOR_API = 'https://api.anchorprotocol.com/api/v1'
const MAX_LUNA_PRICE = 100

const handleGetReq = {}

interface liquidationInfo {
  liquidationPrice: number
  blunaCollateral: number
}

handleGetReq['/'] = async (req: any, res: any, next: any) => {
  try {
    const { borrower_infos } = await queryMarketBorrowerInfos({
      lcd,
      market: MARKET_DENOMS.UUSD,
      limit: 10000 // limit param not functioning as desired, only returning small fraction of total borrowers 
    })(addressProvider)

    const liquidationInfos : liquidationInfo[] = []
    // use all settled to complete iterations in parallel even if some fail
    await Promise.allSettled(borrower_infos.map(async({ borrower, loan_amount}) => { 
      if (Number(loan_amount) > 0) { // could combine this logic with the below logic for more concise code
        const info = await getLiquidationInfo(borrower)
        liquidationInfos.push(info)
      }
    }))
    const lunaPrices = Array.from({length: MAX_LUNA_PRICE}, (v, i) => i)

    const liquidations = {}

    // could use a reduce function here as well but
    lunaPrices.map((price) => {
      let sum = 0
      liquidationInfos.map((info) => {
        if (info.liquidationPrice > price) {
          sum += info.blunaCollateral
        }
      })
      liquidations[price] = sum
    })
    
    // track incoming blockData with observer.getBlockData() and consider relevant events (repay/borrow) to make updates to liquidations
    res.send(liquidations)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

handleGetReq['/info'] = async (req: any, res: any, next: any) => {
  try {
    const { total_borrowed } = (await axios.get(`${ANCHOR_API}/borrow`)).data
    const { collaterals } = (await axios.get(`${ANCHOR_API}/collaterals`)).data
    const [ eth, bluna ] = collaterals
    res.send({ total_borrowed, ethCollat: eth.collateral, blunaCollat: bluna.collateral })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// would add handler here if func not found in controller
export const getRequestHandler = (handelFuncName: string) => handleGetReq[handelFuncName]
