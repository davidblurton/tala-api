import _ from 'lodash'
import database from '../models/database'
import getPrepositionFilters from '../filters/prepositions'
import getVerbFilters from '../filters/verbs'

function uniqueWords(words) {
  return _.uniq(words, w => w.binId)
}

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
  let results = Promise.all(ids.map(database.lookup))

  return _.flatten(results)
}

async function preposition(modifier, word) {
  let nouns = uniqueWords(await database.lookup(word))
  let results = await this.related(word)

  let filters = await getPrepositionFilters(modifier, nouns)

  return filters.map(filter => {
    let {grammarTag} = filter
    return _.mapValues(grammarTag, tag => results.filter(x => x.binId === filter.binId && x.grammarTag === tag)[0])
  })
}

async function verb(modifier, word) {
  let results = await this.related(word)

  let {grammarTag} = getVerbFilters(modifier)

  return _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])
}

export default {suggestions, related, preposition, verb}
