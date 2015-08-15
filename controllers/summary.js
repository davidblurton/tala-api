import _ from 'lodash'
import database from '../models/database'
import getPrepositionFilters from '../filters/prepositions'
import getVerbFilters from '../filters/verbs'
import summaryFormatter from '../formatters/summary'

// Generates a list of autocompletion suggestions.
function suggestions(prefix, limit) {
  return database.search(prefix)
    .then(results => results.filter(x => x.headWord === x.wordForm)) // this should be a filter
    .then(results => results.map(x => x.wordForm))
    .then(_.unique)
    .then(results => results.slice(0, limit))
}

// Are there matching words from multiple headwords.
function multiple(word) {
  return database.lookup(word)
    .then(results => {
      let ids = results.map(result => result.binId)
      return !ids.every(id => id === ids[0])
    })
}

// Find all words from the same headword.
function related(word) {
  return database.lookup(word)
    .then(results => _.chain(results).pluck('binId').unique().value())
    .then(ids => Promise.all(ids.map(id => database.lookup(id))))
    .then(results => _.flatten(results))
}

async function preposition(modifier, word) {
  let nouns = await database.lookup(word)
  let results = await this.related(word)

  let {wordClass, grammarTag} = getPrepositionFilters(modifier, nouns)

  return _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])
}

async function verb(modifier, word) {
  let results = await this.related(word)

  let {wordClass, grammarTag} = getVerbFilters(modifier)

  return _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])
}

export default {suggestions, multiple, related, preposition, verb}
