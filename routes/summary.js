import { Router } from 'express'
import word from '../controllers/word'
import {verbFilter, getFilters} from '../controllers/inputFilter'
import format from './result-formatter'
import verbFormatter from './verb-formatter'

let router = new Router()

router.get('/preposition/:word', (req, res, next) => {
  let input = req.params.word
  let filter = getFilters(input)

  word.filter(filter.word, filter.filters)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/verb/:verb', (req, res, next) => {
  word.filter(req.params.verb, verbFilter)
    .then(results => res.send(verbFormatter(results)))
    .catch(next)
})

export default router
