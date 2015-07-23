import level from 'level'
import concat from './concat-stream-promise'
import wordMapper from './wordMapper'

const SEPARATOR = '~'
const END = '\xff'

let db = level(process.cwd() + '/db')

let database = {
  search(prefix, limit) {
    return db.createKeyStream({
      gte: prefix,
      lt: prefix + END,
      limit: limit || -1
    })
  },

  lookup(word) {
    return db.createKeyStream({
      gte: word + SEPARATOR,
      lt: word + SEPARATOR + END
    })
  }
}

export default {
  search(prefix) {
    return concat(database.search(prefix))
      .then(results => results.map(wordMapper))
  },
  lookup(word) {
    return concat(database.lookup(word))
      .then(results => results.map(wordMapper))
  }
}
