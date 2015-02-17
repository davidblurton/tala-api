var level = require('level')
var db = level(process.cwd() + '/db')

export default {
  search: prefix => db.createKeyStream({
    gte: prefix,
    lt: prefix + '\xff'
  }),

  find: word => db.createKeyStream({
    gte: word + '~',
    lt: word + '~' + '\xff'
  }),

  findOne: word => db.createKeyStream({
    gte: word + '~',
    lt: word + '~' + '\xff',
    limit: 1
  })
}
