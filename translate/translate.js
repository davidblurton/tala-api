import mapTags from './mapTags'

export default (word) => {
  word.tags = mapTags(word.grammarTag, word.wordClass)
  return word
}
