import { Router } from 'express'
import { getDemoRequest } from '../request_handler';

let router = Router()


router.get('/', getDemoRequest)

export default router;