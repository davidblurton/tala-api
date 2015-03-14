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

  findById(id) {
    return concat(database.search(id)
      .pipe(mapper(keyMapper)))
  },

  // Find an exact match for word.
  lookup(word) {
    return concat(database.find(word)
      .pipe(mapper(keyMapper)))
  },

  // Find all words from the same headword.
  related(word) {
    return this.lookup(word)
      .then(results =>
        this.lookup(results.map(result => result.bil_id)[0]))
  },

  // Get the grammar tags for all related words.
  tags(word) {
    return this.related(word)
      .then(results => results.map(result => result.grammar_tag))
  },

  // Find a related word with the specified grammar tag
  includesTag(word, tag) {
    return this.related(word)
      .then(results => results.filter(result => result.grammar_tag.includes(tag)))
  },

  exactTag(word, tag) {
    return this.related(word)
      .then(results => results.filter(result => result.grammar_tag === tag))
  },

  // Get the word class for all matching words.
  classes(word) {
    return this.lookup(word)
      .then(results => results.map(result => result.word_class))
  },

  // Find a matching word with the specified word class
  class(word, word_class) {
    return this.lookup(word)
      .then(results => results.filter(result => result.word_class === word_class))
  },

  // Find fuzzy matches for word.
  fuzzy(word) {
    var streams = fuzzy.getSuggestions(word)
      .map(suggestion => database.findOne(suggestion)
      .pipe(mapper(keyMapper)))

    return concat(es.merge.apply(null, streams))
  }
}
