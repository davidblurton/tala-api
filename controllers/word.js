import _ from 'lodash'
import words from '../models/database'

export default {
  // Find word by id
  findById: (id) => words.search(id),

  // Find an exact match for word.
  lookup: (word) => words.lookup(word),

  // Finds words that start with prefix.
  prefix: (prefix) => words.search(prefix),

  // Find all words from the same headword.
  related(word) {
    return words.lookup(word)
      .then(results => _.chain(results).pluck('binId').unique().value())
      .then(ids => Promise.all(ids.map(id => words.lookup(id))))
      .then(results => _.flatten(results))
  },
}
