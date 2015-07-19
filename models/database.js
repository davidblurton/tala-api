import level from 'level'
import concat from './concat-stream-promise'
import streamTransformer from './streamTransformer'
import wordMapper from './wordMapper'

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
      gte: word + '~',
      lt: word + '~' + END
    })
  }
}

export default {
  search: prefix => concat(database.search(prefix).pipe(streamTransformer(wordMapper))),
  lookup: word => concat(database.lookup(word).pipe(streamTransformer(wordMapper)))
}
