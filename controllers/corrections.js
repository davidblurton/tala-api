import _ from 'lodash'
import database from '../models/database'
import icenlp from '../models/icenlp'
import summary from './summary'
import {structure, wordFromPart} from '../grammar/parsed'
import getVerbFilters from '../filters/verbs'

// Find all words from the same headword.
async function related(word) {
  let words = await database.lookup(word)

  let ids = _.chain(words).pluck('binId').unique().value()
  let related = await* ids.map(database.lookup)

  return _.flatten(related)
}

async function sentence(query) {
  let parsedQuery = await icenlp(query)
  let result = await verb(query, parsedQuery.parsed)
  return result
}

async function verb(query, parsedQuery) {
  let parts = structure(parsedQuery)
  let modifier = wordFromPart(parts.subject)
  let verb = wordFromPart(parts.verb)

  let results = await related(verb)

  let {wordClass, grammarTag} = getVerbFilters(modifier)

  let corrected = _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])

  let replacements = Object.values(_.mapValues(corrected, x => x.wordForm))

  return replacements.map(replacement => query.replace(verb, replacement))
}

export default {verb, sentence}
