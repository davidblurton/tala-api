import _ from 'lodash'
import database from '../models/database'
import getPrepositionFilters from '../filters/prepositions'
import summaryFormatter from '../formatters/summary'

function includes(array, property, values) {
  return Object.keys(values).map(key => {
    let result = {}
    let value = values[key]

    result[key] = array.filter(x => x[property] === value)[0]

    return result
  })[0]
}

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

async function preposition(words) {
  let parsed = words.split(' ')
  let modifier = (parsed[0] || '').toLowerCase()
  let word = (parsed[1] || '').toLowerCase()

  let nouns = await database.lookup(word)
  let {wordClass, grammarTag} = getPrepositionFilters(modifier, nouns)

  let results = await this.related(word)

  results = results.filter(x => x.wordClass === wordClass)
  results = includes(results, 'grammarTag', grammarTag)

  return summaryFormatter(results, modifier)
}

export default {suggestions, multiple, related, preposition}
