var level = require('level');
var db = level('./db');
var concat = require('concat-stream');

var streamTransformer = require('../transformers/transformer');
var keyMapper = require('../transformers/key');

module.exports = {
  // Finds words that start with prefix.
  prefix: function(prefix, cb) {
    var concatStream = concat({
      encoding: 'object'
    }, cb);

    db.createKeyStream({
      gte: prefix,
      lt: prefix + '\xff'
    })
      .pipe(streamTransformer(keyMapper))
      .pipe(concatStream);
  },

  // Generates a list of autocompletion suggestions.
  suggestions: function(prefix, cb) {
    var concatStream = concat({
      encoding: 'object'
    }, cb);

    db.createKeyStream({
      gte: prefix,
      lt: prefix + '\xff'
    })
      .pipe(streamTransformer(keyMapper))
      .pipe(concatStream);
  },

  // Find an exact match for word.
  lookup: function(word, cb) {
    var concatStream = concat({
      encoding: 'object'
    }, cb);

    db.createKeyStream({
      gte: word + '~',
      lt: word + '~\xff'
    })
      .pipe(streamTransformer(keyMapper))
      .pipe(concatStream);
  },

  // Find all words from the same headword.
  related: function(word, cb) {
    this.lookup(word, function(results) {
      return this.lookup(results[0].bil_id, cb);
    }.bind(this));
  }
}
