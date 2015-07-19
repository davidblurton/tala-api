import level from 'level'
let db = level(process.cwd() + '/db')

export default {
  search(prefix, limit) {
    return db.createKeyStream({
      gte: prefix,
      lt: prefix + '\xff',
      limit: limit || -1
    })
  },

  find(word) {
    return db.createKeyStream({
      gte: word + '~',
      lt: word + '~' + '\xff'
    })
  },

  findOne(word) {
    return db.createKeyStream({
      gte: word + '~',
      lt: word + '~' + '\xff',
      limit: 1
    })
  },
}
