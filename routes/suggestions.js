import { Router } from 'express'
import { getSuggestions } from '../corrections/spelling'

let router = new Router()

router.get('/suggestions/:word', (req, res, next) => {
  getSuggestions(req.params.word, function(err, results) {
    if (err) return next(err)
    res.json(results)
  })
})

export default router
