import _ from 'lodash'
import words from '../models/database'

export default {
  // Generates a list of autocompletion suggestions.
  suggestions(prefix, limit) {
    return words.search(prefix)
      .then(results => results.filter(x => x.headWord === x.wordForm)) // this should be a filter
      .then(results => results.map(x => x.wordForm))
      .then(_.unique)
      .then(results => results.slice(0, limit))
  },

  // Are there matching words from multiple headwords.
  multiple(word) {
    return words.lookup(word)
      .then(results => {
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
  }
}
