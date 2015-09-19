import _ from 'lodash'
import declensions from '../controllers/declensions'
import getVerbFilters from '../filters/verbs'

export default async function (tokenized, parts) {
  if (!parts.subject || !parts.verb) {
    return false
  }

  let modifier = parts.subject.word
  let verb = parts.verb.word

  let results = await declensions.related(verb)

  let {grammarTag} = getVerbFilters(modifier)

  let corrected = _.mapValues(grammarTag, tag => results.filter(x => x.grammarTag === tag)[0])

  let replacements = Object.values(_.mapValues(corrected, x => x.wordForm))
  let isCorrect = replacements.includes(verb)

  return {
    rule: `verb ${isCorrect ? 'agrees' : 'should agree'} with subject`,
    modifierIndex: tokenized.indexOf(modifier),
    targetIndex: tokenized.indexOf(verb),
    replacements,
    isCorrect,
  }
}
