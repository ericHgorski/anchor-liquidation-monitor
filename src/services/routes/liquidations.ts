import { Router } from 'express'
import { getRequestHandler } from '../controllers/liquidations'

const router = Router()

router.get('/', getRequestHandler('/'))

export default router
