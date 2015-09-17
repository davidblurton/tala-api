import _ from 'lodash'
import database from '../models/database'
import icenlp from '../models/icenlp'
import summary from './summary'
import {structure, headwordFromPart} from '../grammar/parsed'
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
  let modifier = parts.subject.word
  let verb = parts.verb.word

  if(!modifier) {
    return
  }

  let results = await related(verb)

  let {grammarTag} = getVerbFilters(modifier)

  let corrected = _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])

  let replacements = Object.values(_.mapValues(corrected, x => x.wordForm))

  return {
    rule: 'verb should agree with subject',
    modifierIndex: tokenized.indexOf(modifier),
    targetIndex: tokenized.indexOf(verb),
    replacements,
    isCorrect: replacements.includes(verb),
  }
}

function getDirectedCase(results) {
  let caseTag = results.map(r => Object.keys(r))[0]

  let cases = {
    'NF': 'nominative',
    'ÞF': 'accusative',
    'ÞGF': 'dative',
    'EF': 'genitive',
  }

  return cases[caseTag]
}

async function preposition(tokenized, parts) {
  if (!parts.object.word) {
    return
  }

  let verb = parts.verb.word
  let object = parts.object.word

  let nouns = uniqueWords(await database.lookup(object))
  let results = await related(object)
  let filters = await getPrepositionFilters(verb, nouns)

  let res = filters.map(filter => {
    let {grammarTag} = filter
    return _.mapValues(grammarTag, tag => results.filter(x => x.binId === filter.binId && x.grammarTag === tag)[0])
  })

  let replacements = Object.values(res[0]).map(x => x.wordForm)

  return {
    rule: 'object should agree with verb',
    explanation: `${verb} directs the ${getDirectedCase(res)} case`,
    modifierIndex: tokenized.indexOf(verb),
    targetIndex: tokenized.indexOf(object),
    replacements,
    isCorrect: replacements.includes(object),
  }
}

async function getParse(query) {
  let parsedQuery = await icenlp(query)
  let {tokenized, parsed} = parsedQuery
  let parts = structure(parsed)

  return {tokenized, parts, parsed}
}

async function getRules(query) {
  let {tokenized, parts, parsed} = await getParse(query)

  let rules = []

  if (parts.verb) {
    let verbReplacements = await verb(tokenized, parts)
    rules.push(verbReplacements)
  }

  if (parts.object) {
    let prepositionReplacements = await preposition(tokenized, parts)
    rules.push(prepositionReplacements)
  }

  rules = rules.filter(x => x)

  return {
    tokenized,
    // parsed,
    rules,
  }
}

function applyRules({rules, tokenized}) {
  let suggestions = [...tokenized]

  rules.forEach(rules => {
    let replacement = rules.replacements[0]
    suggestions[rules.index] = replacement
  })

  return [suggestions.join(' ')]
}

async function sentence(query) {
  let rules = await getRules(query)
  let suggestions = applyRules(rules)

  return {
    ...rules,
    suggestions
  }
}

export default {verb, sentence, preposition}
