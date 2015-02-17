var concat = require('concat-stream');
var es = require('event-stream');

var database = require('../database');
var mapper = require('../transformers/transformer');
var keyMapper = require('../transformers/key');
var wordMapper = require('../transformers/headword');
var fuzzy = require('../fuzzy');

var allResults = cb => concat({
  encoding: 'object'
}, cb);

export default {
  // Finds words that start with prefix.
  prefix: (prefix, cb) => database.search(prefix)
    .pipe(mapper(keyMapper))
    .pipe(allResults(cb)),

  // Generates a list of autocompletion suggestions.
  suggestions: (prefix, limit, cb) => database.search(prefix, limit)
    .pipe(mapper(wordMapper))
    .pipe(allResults(cb)),

  // Find an exact match for word.
  lookup: (word, cb) => database.find(word)
    .pipe(mapper(keyMapper))
    .pipe(allResults(cb)),

  // Find all words from the same headword.
  related: function(word, cb) {
    this.lookup(word, results => this.lookup(results[0].bil_id, cb));
  },

  // Find a related word with the specified grammar tag
  tags: function(word, tag, cb) {
    this.related(word, results => {
      cb(results.filter(result => result.grammar_tag === tag));
    })
  },

  // Find fuzzy matches for word.
  fuzzy: (word, cb) => {
    var streams = fuzzy.getSuggestions(word)
      .map(suggestion => database.findOne(suggestion)
      .pipe(mapper(keyMapper)));

    es.merge.apply(null, streams)
      .pipe(allResults(cb));
  }
}
