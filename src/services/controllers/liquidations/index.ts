import { getLiquidationInfo } from '@/utils/util'
import { Request, Response, NextFunction } from 'express';

const handleGetReq = {}

handleGetReq['/:address'] = async (req: Request, res: Response, next: NextFunction) => {
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
