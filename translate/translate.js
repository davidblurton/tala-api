import mapTags from './mapTags'

export default (word, lang) => {
  word.tags = mapTags(word.grammarTag, word.wordClass, lang)
  return word
}
