import { Router } from 'express'
import summary from '../controllers/summary'
import declensions from '../controllers/declensions'
import getVerbFilters from '../filters/verbs'
import summaryFormatter from '../formatters/summary'
import adjectiveFormatter from '../formatters/adjective'

function includes(array, property, values) {
  return Object.keys(values).map(key => {
    let result = {}
    let value = values[key]

    result[key] = array.filter(x => x[property] === value)[0]

    return result
  })[0]
}

function split(words) {
  let parsed = words.split(' ')
  let first = (parsed[0] || '').toLowerCase()
  let second = (parsed[1] || '')

  return {first, second}
}

let router = new Router()

router.get('/multiple/:word', (req, res, next) => {
  summary.multiple(req.params.word)
    .then(multiple => res.json(multiple))
    .catch(next)
})

router.get('/suggestions/:prefix', (req, res, next) => {
  summary.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.json(results))
    .catch(next)
})

router.get('/verb/:phrase', async function(req, res, next) {
  let {first, second} = split(req.params.phrase)

  let results = await summary.verb(first, second)
  let formattedResults = summaryFormatter(results, first, req.query.lang)
  res.json(formattedResults)
})

router.get('/preposition/:phrase', async function(req, res, next) {
  let {first, second} = split(req.params.phrase)

  let results = await summary.preposition(first, second)
  let formattedResults = summaryFormatter(results, first, req.query.lang)
  res.json(formattedResults)
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
