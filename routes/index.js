import Router from 'express'
let router = new Router()

router.get('/', (req, res) => res.send('tala api running'))

export default router
