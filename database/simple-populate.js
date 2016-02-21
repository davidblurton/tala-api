var LineByLineReader = require('line-by-line');
var _ = require('lodash');
var words = require('./database').words;

function populate(path, mapper, cb) {
  var input = new LineByLineReader(path, {
    skipEmptyLines: true,
    start: 39
  });

  var buffer = []

  input.on('line', function(data) {
    buffer.push(mapper(data))
  });

  input.on('error', function(err) {
    cb(err);
  });

  input.on('end', function() {
    var all = _.flatten(buffer).map(entry => ({
      type: 'put',
      key: entry.binId,
      value: entry
    }));

    words.batch(all, function(err) {
      cb(err);
    });
  });
}

module.exports = populate;
