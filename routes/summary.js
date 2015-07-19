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
    .then(results => {
      let res = {};
      res[filter.keyword] = results.map(x => x.wordForm)
      return res;
    })
    .then(results => res.send(results))
    .catch(next)
})

router.get('/verb/:verb', (req, res, next) => {
  word.filter(req.params.verb, verbFilter)
    .then(results => res.send(verbFormatter(results)))
    .catch(next)
})

export default router
