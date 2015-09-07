import _ from 'lodash'
import database from '../models/database'
import getPrepositionFilters from '../filters/prepositions'
import getVerbFilters from '../filters/verbs'
import getAdjectiveFilters from '../filters/adjectives'

// Generates a list of autocompletion suggestions.
function suggestions(prefix, limit) {
  return database.search(prefix)
    .then(results => results.filter(x => x.headWord === x.wordForm)) // this should be a filter
    .then(results => results.map(x => x.wordForm))
    .then(_.unique)
    .then(results => results.slice(0, limit))
}

// Find all words from the same headword.
async function related(word) {
  let words = await database.lookup(word)

  let ids = _.chain(words).pluck('binId').unique().value()
  let related = await* ids.map(database.lookup)

  return _.flatten(related)
}

async function preposition(modifier, word) {
  let nouns = await database.lookup(word)
  let results = await this.related(word)

  let filters = getPrepositionFilters(modifier, nouns)

  return filters.map(filter => {
    let {wordClass, grammarTag} = filter
    return _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])
  })
}

async function verb(modifier, word) {
  let results = await this.related(word)

  let {wordClass, grammarTag} = getVerbFilters(modifier)

  return _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])
}

async function adjective(adjective, noun) {
  let nouns = await database.lookup(noun)
  let adjectives = (await this.related(adjective)).filter(x => x.wordClass === 'lo')

  let hasDegree = adjectives.every(x => x.grammarTag.split('-').length > 2)

  let {wordClass, grammarTag} = getAdjectiveFilters(nouns, hasDegree)

  return _.mapValues(grammarTag, tag => adjectives.filter(x => x.grammarTag === tag[0])[0])
}

export default {suggestions, related, preposition, verb, adjective}
