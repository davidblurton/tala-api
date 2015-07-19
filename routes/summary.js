import { Router } from 'express'
import word from '../controllers/word'
import {verbFilter, getFilters} from '../controllers/inputFilter'
import verbFormatter from './verb-formatter'
import prepositionFormatter from './preposition-formatter'

let router = new Router()

router.get('/preposition/:word', (req, res, next) => {
  let input = req.params.word
  let filter = getFilters(input)

  word.filter(filter.word, filter.filters)
    .then(results => res.send(prepositionFormatter(results, filter.keyword)))
    .catch(next)
})

router.get('/verb/:verb', (req, res, next) => {
  word.filter(req.params.verb, verbFilter)
    .then(results => res.send(verbFormatter(results)))
    .catch(next)
})

export default router
