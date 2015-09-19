import _ from 'lodash'
import declensions from '../controllers/declensions'
import {headwordFromTagged} from '../grammar/parsed'
import getPrepositionFilters from '../filters/prepositions'
import {uniqueWords, getDirectedCase} from './helpers'

export default async function (tokenized, parts, tagged) {
  if (!parts.preposition || !parts.prepositionObject) {
    return false
  }

  let preposition = parts.preposition.word
  let object = parts.prepositionObject.word

  let headWord = headwordFromTagged(tokenized, tagged, object)
  let nouns = uniqueWords(await declensions.find(object)).filter(x => x.headWord === headWord)
  let results = await declensions.related(object)
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
