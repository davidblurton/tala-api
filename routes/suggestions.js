import { Router } from 'express'
import { suggestions } from '../controllers/suggestions'

let router = new Router()

router.get('/suggestions/:word', (req, res, next) => {
  suggestions(req.params.word)
    .then(results => res.json(results), next)
})

export default router
