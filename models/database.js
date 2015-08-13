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

async function search(prefix) {
  let results = await concat(database.search(prefix))
  return results.map(wordMapper)
}

async function lookup(word) {
  let results = await concat(database.lookup(word))
  return results.map(wordMapper)
}

export default {search, lookup}
