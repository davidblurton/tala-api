import { Router } from 'express'
import summary from '../controllers/summary'
import getFilters from '../filters/summary'
import verbFilters from '../filters/verbs'
import prepositionFilters from '../filters/prepositions'
import verbFormatter from '../formatters/verb'
import prepositionFormatter from '../formatters/preposition'

let router = new Router()

router.get('/preposition/:preposition/:word', (req, res, next) => {
  let filter = getFilters(prepositionFilters, req.params.preposition, req.params.word)

  summary.filter(filter.word, filter.filters)
    .then(results => res.send(prepositionFormatter(results, filter.query)))
    .catch(next)
})

router.get('/verb/:person/:verb', (req, res, next) => {
  let filter = getFilters(verbFilters, req.params.person, req.params.verb)

  summary.filter(req.params.verb, filter.filters)
    .then(results => res.send(verbFormatter(results, filter.query)))
    .catch(next)
})

router.get('/multiple/:word', (req, res, next) => {
  summary.multiple(req.params.word)
    .then(multiple => res.send(multiple))
    .catch(next)
})

router.get('/suggestions/:prefix', (req, res, next) => {
  summary.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.send(results))
    .catch(next)
})

export default router
