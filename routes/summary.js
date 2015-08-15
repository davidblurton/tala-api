import { Router } from 'express'
import summary from '../controllers/summary'
import declensions from '../controllers/declensions'
import getVerbFilters from '../filters/verbs'
import summaryFormatter from '../formatters/summary'

function includes(array, property, values) {
  return Object.keys(values).map(key => {
    let result = {}
    let value = values[key]

    result[key] = array.filter(x => x[property] === value)[0]

    return result
  })[0]
}

function split(word) {
  let parsed = words.split(' ')
  let modifier = (parsed[0] || '').toLowerCase()
  let word = (parsed[1] || '')

  return {modifier, word}
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

router.get('/verb/:phrase', (req, res, next) => {
  let {modifier, word} = split(req.params.phrase)

  let results = await summary.verb(modifier, word)
  let formattedResults = summaryFormatter(results, req.query.lang)
  res.json(formattedResults)
})

router.get('/preposition/:phrase', async function(req, res, next) {
  let {modifier, word} = split(req.params.phrase)

  let results = await summary.preposition(modifier, word)
  let formattedResults = summaryFormatter(results, req.query.lang)
  res.json(formattedResults)
})

export default router
