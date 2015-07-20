import { Router } from 'express'
import summary from '../controllers/summary'
import getFilters from '../filters/summary'
import verbFilters from '../filters/verbs'
import getPrepositionFilters from '../filters/prepositions'
import summaryFormatter from '../formatters/summary'
import prepositionFormatter from '../formatters/preposition'

import _ from 'lodash'

let router = new Router()

router.get('/preposition/:preposition/:word', (req, res, next) => {
  let filters = getPrepositionFilters(req.params.preposition)

  summary.filter(req.params.word, filters)
    .then(results => res.send(summaryFormatter(results, req.params.preposition)))
    .catch(next)
})

router.get('/verb/:person/:verb', (req, res, next) => {
  let filter = getFilters(verbFilters, req.params.person, req.params.verb)

  summary.filter(req.params.verb, filter.filters)
    .then(results => res.send(summaryFormatter(results, filter.query)))
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
