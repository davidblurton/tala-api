import level from 'level'

const END = '\xff'
let db = level(process.cwd() + '/db')

export default {
  search(prefix, limit) {
    return db.createKeyStream({
      gte: prefix,
      lt: prefix + END,
      limit: limit || -1
    })
  },

  find(word) {
    return db.createKeyStream({
      gte: word + '~',
      lt: word + '~' + END
    })
  },

  findOne(word) {
    return db.createKeyStream({
      gte: word + '~',
      lt: word + '~' + END,
      limit: 1
    })
  },
}
