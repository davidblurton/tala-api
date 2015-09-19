import { Router } from 'express'
import controller from '../controllers/sentence'

let router = new Router()

router.get('/sentence', (req, res, next) => {
  let sentence = req.query.q

  if (!sentence) {
    res.sendStatus(400, 'You should send a sentence with the query parameter q')
  }

  controller.sentence(sentence).then(results => {
    if (process.env.NODE_ENV === 'production') {
      req.log.info(results)
    }

    res.json(results)
  }, next)
})

export default router
