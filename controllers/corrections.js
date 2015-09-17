import _ from 'lodash'
import database from '../models/database'
import icenlp from '../models/icenlp'
import summary from './summary'
import {structure, headwordFromTagged} from '../grammar/parsed'
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
  if (!parts.subject || !parts.verb) {
    return
  }

  let modifier = parts.subject.word
  let verb = parts.verb.word

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
  let caseTags = results.map(r => Object.keys(r))

  let cases = {
    'NF': 'nominative',
    'ÞF': 'accusative',
    'ÞGF': 'dative',
    'EF': 'genitive',
  }

  return caseTags.map(caseTag => cases[caseTag]).join(' or ')
}

async function verbObject(tokenized, parts) {
  if (!parts.object || !parts.verb) {
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

async function preposition(tokenized, parts, tagged) {
  if (!parts.preposition || !parts.prepositionObject) {
    return
  }

  let preposition = parts.preposition.word
  let object = parts.prepositionObject.word

  let headWord = headwordFromTagged(tokenized, tagged, object)
  let nouns = uniqueWords(await database.lookup(object)).filter(x => x.headWord === headWord)
  let results = await related(object)
  let filters = await getPrepositionFilters(preposition, nouns)

  let res = filters.map(filter => {
    let {grammarTag} = filter
    return _.mapValues(grammarTag, tag => results.filter(x => x.binId === filter.binId && x.grammarTag === tag)[0])
  })

  let replacements = _(res.map(word => Object.values(word).map(x => x.wordForm))).flatten().unique().value()

  return {
    rule: 'object should agree with preposition',
    explanation: `${preposition} directs the ${getDirectedCase(res)} case`,
    modifierIndex: tokenized.indexOf(preposition),
    targetIndex: tokenized.indexOf(object),
    replacements,
    isCorrect: replacements.includes(object),
  }
}

async function getParse(query) {
  let parsedQuery = await icenlp(query)
  let {tokenized, parsed, tagged} = parsedQuery
  let parts = structure(parsed)

  return {tokenized, parts, parsed, tagged}
}

async function getRules(query) {
  let {tokenized, parts, parsed, tagged} = await getParse(query)

  let rules = []

  if (parts.verb) {
    let verbReplacements = await verb(tokenized, parts)
    rules.push(verbReplacements)
  }

  if (parts.object) {
    let prepositionReplacements = await verbObject(tokenized, parts)
    rules.push(prepositionReplacements)
  }

  if (parts.preposition) {
    let prepositionReplacements = await preposition(tokenized, parts, tagged)
    rules.push(prepositionReplacements)
  }

  rules = rules.filter(x => x)

  return {
    tokenized,
    parsed,
    rules,
    tagged,
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
