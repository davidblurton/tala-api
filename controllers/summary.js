import _ from 'lodash'
import database from '../models/database'
import getPrepositionFilters from '../filters/prepositions'
import getVerbFilters from '../filters/verbs'
import getAdjectiveFilters from '../filters/adjectives'

function includes(array, values) {
  return Object.keys(values).map(key => {
    let result = {}
    let value = values[key]

    result[key] = array.filter(x => x.grammarTag === value)[0]

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

async function adjective(adjective, noun) {
  let nouns = await database.lookup(noun)
  let adjectives = (await this.related(adjective)).filter(x => x.wordClass === 'lo')

  let {wordClass, grammarTag} = getAdjectiveFilters(nouns)

  return _.mapValues(grammarTag, tag => adjectives.filter(x => x.grammarTag === tag[0])[0])
}



export default {suggestions, multiple, related, preposition, verb, adjective}
