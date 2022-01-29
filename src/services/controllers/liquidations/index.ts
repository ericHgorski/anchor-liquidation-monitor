import { getLiquidationInfo } from '@/utils/util'

const handleGetReq = {}

handleGetReq['/:address'] = async (req: any, res: any, next: any) => {
  try {
    const { address } = req.params
    const { liquidationPrice, blunaCollateral } = await getLiquidationInfo(address)
    const resp = { address, liquidationPrice, blunaCollateral }
    res.send(resp)
  } catch (err) {
    console.error(err)
    next(err)
  }
}
// would add handler here if func not found in controller
export const getRequestHandler = (handelFuncName: string) => handleGetReq[handelFuncName]
