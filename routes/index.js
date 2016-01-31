import Router from 'express'
let router = new Router()

router.get('/', (req, res) => res.send('tala api running'))

router.get('/loaderio-f7ba020fa41e103dcd582cda31797ceb', (req, res) => res.send('loaderio-f7ba020fa41e103dcd582cda31797ceb'))

export default router
