import _ from 'lodash'
import words from '../models/database'
import filters from './oldFilters'

export default {
  // Finds words that start with prefix.
  prefix(prefix) {
    return words.search(prefix)
  },

  // Generates a list of autocompletion suggestions.
  suggestions(prefix, limit) {
    return words.search(prefix)
      .then(results => results.filter(x => x.headWord === x.wordForm)) // this should be a filter
      .then(results => results.map(x => x.wordForm))
      .then(_.unique)
      .then(results => results.slice(0, limit))
  },

  findById(id) {
    return words.search(id)
  },

  // Find an exact match for word.
  lookup(word) {
    return words.lookup(word)
  },

  // Are there matching words from multiple headwords.
  multiple(word) {
    return words.lookup(word).then(results => {
      let ids = results.map(result => result.binId)
      return !ids.every(id => id === ids[0])
    })
  },

  // Find all words from the same headword.
  related(word) {
    return words.lookup(word)
      .then(results => _.chain(results).pluck('binId').unique().value())
      .then(ids => Promise.all(ids.map(id => words.lookup(id))))
      .then(results => _.flatten(results))
  },

  // Find a related word with the provided filters.
  // Supports filtering on grammarTag, wordClass.
  filter(word, queries) {
    let wordClass = queries.wordClass
    let tags = queries.grammarTag

    if (!_.isArray(wordClass)) {
      wordClass = [wordClass]
    }

    return this.related(word)
      .then(results => filters.any(results, 'wordClass', wordClass))
      .then(results => filters.includes(results, 'grammarTag', tags))
  }
}
