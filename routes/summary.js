import { Router } from 'express'
import word from '../controllers/word'
import {verbFilter, getFilters} from '../controllers/inputFilter'
import verbFormatter from '../formatters/verb'
import prepositionFormatter from '../formatters/preposition'

let router = new Router()

router.get('/preposition/:preposition/:word', (req, res, next) => {
  let filter = getFilters(req.params.preposition, req.params.word)

  word.filter(filter.word, filter.filters)
    .then(results => res.send(prepositionFormatter(results, filter.preposition)))
    .catch(next)
})

router.get('/verb/:verb', (req, res, next) => {
  word.filter(req.params.verb, verbFilter)
    .then(results => res.send(verbFormatter(results)))
    .catch(next)
})

router.get('/multiple/:word', (req, res, next) => {
  word.multiple(req.params.word)
    .then(multiple => res.send(multiple))
    .catch(next)
})

router.get('/suggestions/:prefix', (req, res, next) => {
  word.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.send(results))
    .catch(next)
})

export default router
