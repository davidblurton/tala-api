import { Router } from 'express'
import word from '../controllers/word'
import format from '../formatters/result'

let router = new Router()

router.get('/id/:word', (req, res, next) => {
  word.findById(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/find/:word', (req, res, next) => {
  word.lookup(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/related/:word', (req, res, next) => {
  word.related(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

export default router
