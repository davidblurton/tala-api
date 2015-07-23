import { Router } from 'express'
import declensions from '../controllers/declensions'
import format from '../formatters/word'
import filter from '../filters/global'

let router = new Router()

router.get('/find/:word', (req, res, next) => {
  declensions.find(req.params.word)
    .then(results => filter(results, req.query))
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/id/:word', (req, res, next) => {
  declensions.findById(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/related/:word', (req, res, next) => {
  declensions.related(req.params.word)
    .then(results => filter(results, req.query))
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

export default router
