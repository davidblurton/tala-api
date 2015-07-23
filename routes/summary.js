import { Router } from 'express'
import summary from '../controllers/summary'
import declensions from '../controllers/declensions'
import getVerbFilters from '../filters/verbs'
import getPrepositionFilters from '../filters/prepositions'
import summaryFormatter from '../formatters/summary'
import prepositionFormatter from '../formatters/preposition'
import oldFilters from '../filters/old'

import _ from 'lodash'

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

router.get('/summary/:phrase', (req, res, next) => {
  let parsed = req.params.phrase.split(' ')

  if (parsed.length === 1) {
    // If it's a verb, show verb summary
    // If it's a noun, show noun summary
    // If it's a preposition, show meaning and what case it directs

    declensions.find(parsed[0])
      .then(results => res.send(results))
      .catch(next)
  } else {
    let modifier = parsed[0].toLowerCase();
    let word = parsed[1].toLowerCase();

    let prepositionFilter = getPrepositionFilters(modifier)

    if (prepositionFilter) {
      // Do preposition + noun
      Promise.all(prepositionFilter.map(filter => {
        let {wordClass, grammarTag} = filter;

        return summary.related(word)
          .then(results => oldFilters.any(results, 'wordClass', wordClass))
          .then(results => oldFilters.includes(results, 'grammarTag', grammarTag))
      }))
        .then(results => res.send(summaryFormatter(results, modifier)))
        .catch(next)
    } else {
      // Do pronoun + verb match
      let verbFilter = getVerbFilters(modifier)
      let {wordClass, grammarTag} = verbFilter;

      summary.related(word)
        .then(results => oldFilters.any(results, 'wordClass', wordClass))
        .then(results => oldFilters.includes(results, 'grammarTag', grammarTag))
        .then(results => res.send(summaryFormatter(results, modifier)))
        .catch(next)
    }
  }
})

export default router
