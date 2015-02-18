var level = require('level')
var db = level(process.cwd() + '/db')

export default {
  search(prefix) {
    return db.createKeyStream({
      gte: prefix,
      lt: prefix + '\xff'
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
