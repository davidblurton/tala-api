var index = require('./database').index;
var _ = require('lodash');

var separator = '|';

function getBy(indexName, value, cb) {
  var gt = [indexName, value, ''].join(separator)
  var lt = [indexName, value, '\xff'].join(separator)

  var results = [];

  index.createReadStream({
    gt,
    lt,
    values: false,
    fillCache: true,
  })
  .on('data', function (data) {
    results.push(data.split(separator).slice(-1)[0])
  })
  .on('error', function (err) {
    cb(err)
  })
  .on('end', function () {
    cb(null, _.uniq(results))
  })
}

module.exports = getBy;
