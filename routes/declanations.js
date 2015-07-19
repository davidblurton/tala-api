import { Router } from 'express'
import declanations from '../controllers/declanations'
import format from '../formatters/result'
import filter from '../filters/global'

let router = new Router()

router.get('/find/:word', (req, res, next) => {
  declanations.find(req.params.word)
    .then(results => filter(results, req.query))
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/id/:word', (req, res, next) => {
  declanations.findById(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/related/:word', (req, res, next) => {
  declanations.related(req.params.word)
    .then(results => filter(results, req.query))
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

export default router
