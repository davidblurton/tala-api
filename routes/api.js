import { Router } from 'express'
import word from '../controllers/word'
import format from './result-formatter'

let router = new Router()

router.get('/:word', (req, res, next) => {
  word.lookup(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/:word/id', (req, res, next) => {
  word.findById(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/:word/related', (req, res, next) => {
  word.related(req.params.word)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/:word/filter', (req, res, next) => {
  word.filter(req.params.word, req.query)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/:prefix/prefix', (req, res, next) => {
  word.prefix(req.params.prefix)
    .then(results => res.send(format(results, req.query.lang)))
    .catch(next)
})

router.get('/:prefix/suggestions', (req, res, next) => {
  word.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.send(results))
    .catch(next)
})

export default router
