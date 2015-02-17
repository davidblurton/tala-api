var es = require('event-stream');
var concat = require('./concat-stream-promise');
var database = require('../database');
var mapper = require('../transformers/transformer');
var keyMapper = require('../transformers/key');
var wordMapper = require('../transformers/headword');
var fuzzy = require('../fuzzy');

export default {
  // Finds words that start with prefix.
  prefix(prefix) {
    return concat(database.search(prefix)
      .pipe(mapper(keyMapper)))
  },

  // Generates a list of autocompletion suggestions.
  suggestions(prefix, limit) {
    return concat(database.search(prefix, limit)
      .pipe(mapper(wordMapper)))
  },

  // Find an exact match for word.
  lookup(word) {
    return concat(database.find(word)
      .pipe(mapper(keyMapper)))
  },

  // Find all words from the same headword.
  related(word) {
    return this.lookup(word)
      .then(results => this.lookup(results[0].bil_id))
  },

  // Find a related word with the specified grammar tag
  tags(word, tag) {
    return this.related(word)
      .then(results => results.filter(result => result.grammar_tag === tag))
  },

  // Find fuzzy matches for word.
  fuzzy(word) {
    var streams = fuzzy.getSuggestions(word)
      .map(suggestion => database.findOne(suggestion)
      .pipe(mapper(keyMapper)))

    return concat(es.merge.apply(null, streams))
  }
}
