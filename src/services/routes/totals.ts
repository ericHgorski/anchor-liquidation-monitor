import { Router } from 'express'
import { getRequestHandler } from '@/services/controllers/totals'

const router = Router()

// add middleware here
router.get('/', getRequestHandler('/'))
router.get('/info', getRequestHandler('/info'))

export default router
