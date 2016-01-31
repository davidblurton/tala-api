import { Router } from 'express'
import { generateSuggestions, filterSuggestions } from '../corrections/spelling'

let router = new Router()

router.get('/suggestions/:word', (req, res, next) => {
  filterSuggestions(generateSuggestions(req.params.word))
    .then(results => res.send(results))
    .catch(next)
})

export default router
