import { Router } from 'express'
import summary from '../controllers/summary'
import declensions from '../controllers/declensions'
import getVerbFilters from '../filters/verbs'
import summaryFormatter from '../formatters/summary'
import adjectiveFormatter from '../formatters/adjective'

function split(words) {
  let parsed = words.split(' ')
  let first = (parsed[0] || '').toLowerCase()
  let second = (parsed[1] || '')

  return {first, second}
}

let router = new Router()

router.get('/suggestions/:prefix', async function(req, res, next) {
  try {
    let results = await summary.suggestions(req.params.prefix, req.query.limit)
    res.json(results)
  } catch (err) {
    next(err)
  }
})

router.get('/verb/:phrase', async function(req, res, next) {
  try {
    let {first, second} = split(req.params.phrase)
    let results = await summary.verb(first, second)
    let formattedResults = summaryFormatter(results, first, req.query.lang)

    res.json(formattedResults)
  } catch(err) {
    next(err)
  }
})

router.get('/preposition/:phrase', async function(req, res, next) {
  try {
    let {first, second} = split(req.params.phrase)
    let results = await summary.preposition(first, second)
    let formattedResults = summaryFormatter(results, first, req.query.lang)

    res.json(formattedResults)
  } catch (err) {
    next(err)
  }
})

router.get('/adjective/:phrase', async function(req, res, next) {
  try {
    let {first, second} = split(req.params.phrase)
    let results = await summary.adjective(first, second)
    let formattedResults = adjectiveFormatter(results, second, req.query.lang)

    res.json(formattedResults)
  } catch (err) {
    next(err)
  }
})

export default router
