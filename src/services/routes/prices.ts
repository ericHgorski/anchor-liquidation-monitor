import { Router } from 'express'
import { getRequestHandler } from '../controllers/prices'

const router = Router()

router.get('/', getRequestHandler('/'))

export default router
