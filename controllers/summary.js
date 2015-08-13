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

async function preposition(words, lang) {
  let parsed = words.split(' ')
  let modifier = (parsed[0] || '').toLowerCase()
  let word = (parsed[1] || '')

  let nouns = await database.lookup(word)
  let results = await this.related(word)

  let filters = getPrepositionFilters(modifier, nouns)

  return filters.map(filter =>  {
    let {wordClass, grammarTag} = filter

    let matching = includes(results, 'grammarTag', grammarTag)

    return summaryFormatter(matching, modifier, lang)
  })




}

export default {suggestions, multiple, related, preposition}
