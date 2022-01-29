import { Router } from 'express'
import { getRequestHandler } from '@/services/controllers/liquidations'

const router = Router()

router.get('/:address', getRequestHandler('/:address'))

export default router
