import lookup from './translate.json'
import mapTags from './mapTags'
import parseGrammarTags from './grammar-tag-parser'

export default (word, language) => {
  var tags = parseGrammarTags(word, language)

  word.tags = mapTags(word.grammarTag, word.wordClass)

  return word
}
