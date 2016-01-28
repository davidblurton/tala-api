import level from 'levelup'
import concat from './concat-stream-promise'
import wordMapper from './wordMapper'

const SEPARATOR = '~'
const END = '\xff'

const path = process.cwd() + '/db'
const options = {
  createIfMissing: false,
}

let db = level(path, options)

let database = {
  search(prefix, limit) {
    return db.createKeyStream({
      gte: prefix,
      lt: prefix + END,
      limit: limit || -1,
      fillCache: true,
    })
  },

  lookup(word) {
    return db.createKeyStream({
      gte: word + SEPARATOR,
      lt: word + SEPARATOR + END,
      fillCache: true,
    })
  },
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
