var concat = require('concat-stream');

var database = require('../database');
var streamTransformer = require('../transformers/transformer');
var keyMapper = require('../transformers/key');
var wordMapper = require('../transformers/headword');

var allResults = function(cb) {
  return concatStream = concat({
    encoding: 'object'
  }, cb);
}

module.exports = {
  // Finds words that start with prefix.
  prefix: function(prefix, cb) {
    database.search(prefix)
      .pipe(streamTransformer(keyMapper))
      .pipe(allResults(cb));
  },

  // Generates a list of autocompletion suggestions.
  suggestions: function(prefix, limit, cb) {
    database.search(prefix, limit)
      .pipe(streamTransformer(wordMapper))
      .pipe(allResults(cb));
  },

  // Find an exact match for word.
  lookup: function(word, cb) {
    database.find(word)
      .pipe(streamTransformer(keyMapper))
      .pipe(allResults(cb));
  },

  // Find all words from the same headword.
  related: function(word, cb) {
    this.lookup(word, function(results) {
      this.lookup(results[0].bil_id, cb);
    }.bind(this));
  }
}
