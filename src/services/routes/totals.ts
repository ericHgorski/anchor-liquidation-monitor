import { Router } from 'express'
import { getRequestHandler } from '@/services/controllers/totals'

const router = Router()

// add middleware here
router.get('/', getRequestHandler('/'))

export default router
