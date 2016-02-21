import { words } from '../database/database'
import getBy from '../database/get-by'

/**
 * Find a word by id.
 * @param  {string} id
 * @return {Array}
 */
function findById(id) {
  return new Promise((resolve, reject) => {
    words.get(id, function(err, results) {
      if (err) return reject(err)
      resolve(results)
    })
  })
}

/**
 * Find all words from the same headword.
 * @param  {string} word
 * @return {Array}
 */
function find(word) {
  return new Promise((resolve, reject) => {
    getBy('form', word, function(err, results) {
      if (err) return reject(err)
      resolve(results)
    })
  }).then(ids => {
    return Promise.all(ids.map(id => findById(id)))
  })
}

export default {
  findById,
  find,
}
