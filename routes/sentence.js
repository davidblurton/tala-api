import { Router } from 'express'
import corrections from '../controllers/corrections'

let router = new Router()

router.get('/sentence', (req, res, next) => {
  let sentence = req.query.q

  if (!sentence) {
    res.sendStatus(400, 'You should send a sentence with the query parameter q')
  }
  corrections.sentence(sentence).then(results => {
    req.log.info(results)
    res.json(results)
  }, next)
})

export default router
