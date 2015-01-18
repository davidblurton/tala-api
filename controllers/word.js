var level = require('level');
var db = level('./db');
var concat = require('concat-stream');

var streamTransformer = require('../transformers/transformer');
var keyMapper = require('../transformers/key');
var valueMapper = require('../transformers/value');

module.exports = {
  // Finds words that start with prefix.
  prefix: function(prefix, cb) {
    var concatStream = concat({
      encoding: 'object'
    }, cb);

    db.createValueStream({
      gte: prefix,
      lt: prefix + '\xff'
    })
      .pipe(streamTransformer(valueMapper))
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

    db.createValueStream({
      gte: word + ';',
      lt: word + ';\xff'
    })
      .pipe(streamTransformer(valueMapper))
      .pipe(concatStream);
  },

  // Find all words from the same headword.
  related: function(word) {

  }
}
