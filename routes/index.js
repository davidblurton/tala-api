import Router from 'express'
let router = new Router()

router.get('/', (req, res) => res.render('index'))

export default router
