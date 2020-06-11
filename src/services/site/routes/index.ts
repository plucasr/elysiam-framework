import { Router } from 'express'


let router = Router();

router.get('/', (req, res, next) => {
    res.render('site')
})

export default router;