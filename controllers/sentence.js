import icenlp from '../models/icenlp'
import {structure} from '../grammar/parsed'
import correctionRules from '../rules'

async function getParse(query) {
  let parsedQuery = await icenlp(query)
  let {tokenized, parsed, tagged} = parsedQuery
  let parts = structure(parsed)

  return {tokenized, parts, parsed, tagged}
}

function isRecognized(taggedWord) {
  return !taggedWord.endsWith('*')
}

async function getRules({tokenized, parts, parsed, tagged}) {
  let recognized = tagged.map(isRecognized)
  let rules = []
  let error

  try {
    rules = await* [
      correctionRules.verb(tokenized, parts),
      correctionRules.verbObject(tokenized, parts),
      correctionRules.preposition(tokenized, parts, tagged),
    ]
  } catch (err) {
    // TODO: log error
    console.log(err, err.stack)
    error = err
  }

  rules = rules.filter(x => x)

  return {
    tokenized,
    parsed,
    rules,
    tagged,
    recognized,
    error,
    parts,
  }
}

function applyRules({rules, tokenized}) {
  let suggestions = [...tokenized]

  rules.forEach(rule => {
    let replacement = rule.replacements[0]
    suggestions[rule.index] = replacement
  })

  return [suggestions.join(' ')]
}

async function sentence(query) {
  let {tokenized, parts, parsed, tagged} = await getParse(query)
  let rules = await getRules({tokenized, parts, parsed, tagged})
  let suggestions = applyRules(rules)

  return {
    ...rules,
    suggestions,
  }
}

export default {sentence}
