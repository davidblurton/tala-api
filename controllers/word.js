var es = require('event-stream')
var _ = require('lodash')
var concat = require('./concat-stream-promise')
var database = require('../database')
var mapper = require('../transformers/transformer')
var keyMapper = require('../transformers/key')
var wordMapper = require('../transformers/headword')
var fuzzy = require('../fuzzy')
var filters = require('./filters')

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

  // Are there matching words from multiple headwords.
  multiple(word) {
    let lookup = this.lookup.bind(this)

    return lookup(word).then(results => {
      let ids = results.map(result => result.bil_id)
      return !ids.every(id => id === ids[0])
    })
  },

  // Find all words from the same headword.
  related(word) {
    var lookup = this.lookup.bind(this)

    return lookup(word)
      .then(results => _.chain(results).pluck('bil_id').unique().value())
      .then(ids => Promise.all(ids.map(id => lookup(id))))
      .then(results => _.flatten(results))
  },

  // Find a related word with the provided filters.
  // Supports filtering on grammar_tag, word_class.
  filter(word, queries) {
    //var tags = (queries.grammar_tag || '').split(',') || []
    var tags = queries.grammar_tag || ''
    var word_class = queries.word_class || ''

    return this.related(word)
      .then(results => filters.exact(results, 'word_class', word_class))
      .then(results => filters.exact(results, 'grammar_tag', tags))
  },

  // Get the grammar tags for all related words.
  tags(word) {
    return this.related(word)
      .then(results => results.map(result => result.grammar_tag))
  },

  // Find a related word with the specified grammar tag
  includesTag(word, tags) {
    return this.related(word)
      .then(results => results.filter(
        result => tags.every(
          tag => result.grammar_tag.includes(tag))))
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
