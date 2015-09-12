import _ from 'lodash'
import database from '../models/database'
import icenlp from '../models/icenlp'
import summary from './summary'
import {structure, wordFromPart, headwordFromPart} from '../grammar/parsed'
import getVerbFilters from '../filters/verbs'
import getPrepositionFilters from '../filters/prepositions'

function uniqueWords(words) {
  return _.uniq(words, w => w.binId)
}

// Find all words from the same headword.
async function related(word) {
  let words = await database.lookup(word)

  let ids = _.chain(words).pluck('binId').unique().value()
  let related = await* ids.map(database.lookup)

  return _.flatten(related)
}

async function verb(tokenized, parts) {
  let modifier = wordFromPart(parts.subject)
  let verb = wordFromPart(parts.verb)

  if(!parts.verb) {
    return
  }

  let results = await related(verb)

  let {grammarTag} = getVerbFilters(modifier)

  let corrected = _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])

  let replacements = Object.values(_.mapValues(corrected, x => x.wordForm))

  return {
    rule: 'verb should match subject',
    index: tokenized.indexOf(verb),
    replacements
  }
}

async function preposition(tokenized, parts) {
  if (!parts.object) {
    return
  }

  let verb = wordFromPart(parts.verb)
  let object = wordFromPart(parts.object)

  let nouns = uniqueWords(await database.lookup(object))
  let results = await related(object)
  let filters = await getPrepositionFilters(verb, nouns)

  let res = filters.map(filter => {
    let {grammarTag} = filter
    return _.mapValues(grammarTag, tag => results.filter(x => x.binId === filter.binId && x.grammarTag === tag)[0])
  })

  let replacements = Object.values(res[0]).map(x => x.wordForm)

  return {
    rule: 'object should match verb',
    index: tokenized.indexOf(object),
    replacements
  }
}

async function sentence(query) {
  let parsedQuery = await icenlp(query)
  let {tokenized} = parsedQuery
  let parts = structure(parsedQuery)

  let verbReplacements = await verb(tokenized, parts)
  let prepositionReplacements = await preposition(tokenized, parts)

  return [verbReplacements, prepositionReplacements]
}

export default {verb, sentence, preposition}
