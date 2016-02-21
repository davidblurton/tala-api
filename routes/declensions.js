import { Router } from 'express'
import declensions from '../controllers/declensions'
import format from '../formatters/word'

let router = new Router()

router.get('/find/:word', (req, res, next) => {
  declensions.find(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

router.get('/id/:id', (req, res, next) => {
  declensions.findById(req.params.id)
    .then(results => format(results, req.query.lang))
    .then(results => res.send(results))
    .catch(next)
})

export default router
