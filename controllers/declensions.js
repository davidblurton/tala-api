import _ from 'lodash'
import database from '../models/database'

export default {
  /**
   * Find an exact match for a word.
   * @param  {string} word
   * @return {Array}
   */
  find(word) {
    return database.lookup(word)
  },

  /**
   * Find a word by id.
   * @param  {string} id
   * @return {Array}
   */
  findById(id) {
    return database.search(id)
  },

  /**
   * Find all words from the same headword.
   * @param  {string} word
   * @return {Array}
   */
  related(word) {
    return database.lookup(word)
      .then(results => _.chain(results).pluck('binId').unique().value())
      .then(ids => Promise.all(ids.map(id => words.lookup(id))))
      .then(results => _.flatten(results))
  },
}
