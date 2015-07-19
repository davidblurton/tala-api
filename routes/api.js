import { Router } from 'express'
import word from '../controllers/word'
import format from './result-formatter'

let router = new Router()

router.get('/:word', (req, res, next) => {
  word.lookup(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/:word/id', (req, res, next) => {
  word.findById(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/:word/related', (req, res, next) => {
  word.related(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/:word/filter', (req, res, next) => {
  word.filter(req.params.word, req.query)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

export default router
