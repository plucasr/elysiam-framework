import { Router } from 'express'
import { handleLogin, handleTokenRequest, handleSignUpRequest, handleGet, handleUpdate } from '../request_handler'
const router = Router()

router.get('/token/:token', handleTokenRequest)
router.post('/sign-in', handleLogin)
router.post('/sign-up', handleSignUpRequest)
router.get('/', handleGet);

router.put('/', handleUpdate);

export default router;