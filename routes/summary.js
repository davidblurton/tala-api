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

let router = new Router()

router.get('/multiple/:word', (req, res, next) => {
  summary.multiple(req.params.word)
    .then(multiple => res.send(multiple))
    .catch(next)
})

router.get('/suggestions/:prefix', (req, res, next) => {
  summary.suggestions(req.params.prefix, req.query.limit)
    .then(results => res.send(results))
    .catch(next)
})

router.get('/verb/:phrase', (req, res, next) => {
  let parsed = req.params.phrase.split(' ')
  let modifier = (parsed[0] || '').toLowerCase();
  let word = (parsed[1] || '').toLowerCase();

  let filters = getVerbFilters(modifier)

  if (filters) {
    let {wordClass, grammarTag} = filters;

    summary.related(word)
      .then(results => results.filter(x => x.wordClass === wordClass))
      .then(results => includes(results, 'grammarTag', grammarTag))
      .then(results => res.send(summaryFormatter([results], modifier)))
      .catch(next)
  } else {
    res.send([])
  }
})

router.get('/preposition/:phrase', (req, res, next) => {
  summary.preposition(req.params.phrase, req.query.lang)
    .then(results => res.send(results))
    .catch(next)
})

export default router
