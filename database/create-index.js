var index = require('./database').index
var separator = '|'

function createIndex(db, indexName, fn, cb) {
  console.log('creating indexes...')

  db.createReadStream()
    .on('data', function(data) {
      var keys = fn(data).map(value => [indexName, value, data.key].join(separator))

      index.batch(keys.map(key => ({ type: 'put', key: key})), function(err) {
        if (err) cb(err)
      })
    })
    .on('error', function(err) {
      cb(err)
    })
    .on('end', function() {
      cb()
    })
}

module.exports = createIndex
