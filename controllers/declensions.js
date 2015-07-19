import _ from 'lodash'
import words from '../models/database'

export default {
  // Find an exact match for word.
  find(word) {
    return words.lookup(word)
  },

  // Find word by id
  findById(id) {
    return words.search(id)
  },

  // Find all words from the same headword.
  related(word) {
    return words.lookup(word)
      .then(results => _.chain(results).pluck('binId').unique().value())
      .then(ids => Promise.all(ids.map(id => words.lookup(id))))
      .then(results => _.flatten(results))
  },
}
