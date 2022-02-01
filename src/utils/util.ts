import { MARKET_DENOMS, COLLATERAL_DENOMS, queryCustodyBorrower, queryMarketBorrowerInfo } from '@anchor-protocol/anchor.js'
import { lcd, addressProvider } from '@/services/clients'
import observer from '@/services/sockets'
const MAX_LTV = 0.6

export const parseAsset = (asset: string) => Number(asset) / Math.pow(10, 6)

// ensure of type terra address instead of just string
export const getLiquidationInfo = async (acct: string) => {
  // returns balance i.e amount of bluna provided from a given address
  const { balance} = await queryCustodyBorrower({
    lcd,
    market: MARKET_DENOMS.UUSD,
    custody: COLLATERAL_DENOMS.UBLUNA,
    address: acct,
  })(addressProvider)

  const { loan_amount } = await queryMarketBorrowerInfo({
    lcd,
    market: MARKET_DENOMS.UUSD,
    block_height: observer.getBlockHeight(),
    borrower: acct
  })(addressProvider)

  const blunaCollateral = parseAsset(balance)
  const liquidationPrice = (parseAsset(loan_amount)) / (blunaCollateral * MAX_LTV)
  
  return { liquidationPrice, blunaCollateral }
}