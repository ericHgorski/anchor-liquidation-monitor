import { Router } from 'express'
import { getRequestHandler } from '@/services/controllers/liquidations'

const router = Router()

router.get('/', getRequestHandler('/'))

export default router
