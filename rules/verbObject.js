import _ from 'lodash'
import declensions from '../controllers/declensions'
import getPrepositionFilters from '../filters/prepositions'
import {uniqueWords, getDirectedCase} from './helpers'

export default async function (tokenized, parts) {
  if (!parts.object || !parts.verb) {
    return false
  }

  let verb = parts.verb.word
  let object = parts.object.word

  let nouns = uniqueWords(await declensions.find(object))
  let results = await declensions.related(object)
  let filters = await getPrepositionFilters(verb, nouns)

  let res = filters.map(filter => {
    let {grammarTag} = filter
    return _.mapValues(grammarTag, tag => results.filter(x => x.binId === filter.binId && x.grammarTag === tag)[0])
  })

  let replacements = []

  if (res[0]) {
    replacements = Object.values(res[0]).map(x => x.wordForm)
  }

  let isCorrect = replacements.includes(object)

  return {
    rule: `object ${isCorrect ? 'agrees' : 'should agree'} with verb`,
    explanation: `${verb} directs the ${getDirectedCase(res)} case`,
    modifierIndex: tokenized.indexOf(verb),
    targetIndex: tokenized.indexOf(object),
    replacements,
    isCorrect,
  }
}
