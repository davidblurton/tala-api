import es from 'event-stream'
import _ from 'lodash'
import concat from './concat-stream-promise'
import database from '../database'
import mapper from '../transformers/transformer'
import keyMapper from '../transformers/key'
import wordMapper from '../transformers/headword'
import filters from './filters'

export default {
  // Finds words that start with prefix.
  prefix(prefix) {
    return concat(database.search(prefix)
      .pipe(mapper(keyMapper)))
  },

  // Generates a list of autocompletion suggestions.
  suggestions(prefix, limit) {
    return concat(database.search(prefix)
      .pipe(mapper(keyMapper)))
      .then(results => results.filter(x => x.headWord === x.wordForm)) // this should be a filter
      .then(results => results.map(x => x.wordForm))
      .then(_.unique)
      .then(results => results.slice(0, limit))
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
    let lookup = this.lookup.bind(this)

    return lookup(word)
      .then(results => _.chain(results).pluck('bilId').unique().value())
      .then(ids => Promise.all(ids.map(id => lookup(id))))
      .then(results => _.flatten(results))
  },

  // Find a related word with the provided filters.
  // Supports filtering on grammarTag, wordClass.
  filter(word, queries) {
    let wordClass = queries.wordClass || ''
    let tags = queries.grammarTag || ''

    if (!_.isArray(wordClass)) {
      wordClass = [wordClass]
    }

    return this.related(word)
      .then(results => filters.any(results, 'wordClass', wordClass))
      .then(results => filters.includes(results, 'grammarTag', tags))
  },

  // Get the grammar tags for all related words.
  tags(word) {
    return this.related(word)
      .then(results => results.map(result => result.grammarTag))
  },

  // Find a related word with the specified grammar tag
  includesTag(word, tags) {
    return this.related(word)
      .then(results => results.filter(
        result => tags.every(
          tag => result.grammarTag.includes(tag))))
  },

  exactTag(word, tag) {
    return this.related(word)
      .then(results => results.filter(result => result.grammarTag === tag))
  },

  // Get the word class for all matching words.
  classes(word) {
    return this.lookup(word)
      .then(results => results.map(result => result.wordClass))
  },

  // Find a matching word with the specified word class
  class(word, wordClass) {
    return this.lookup(word)
      .then(results => results.filter(result => result.wordClass === wordClass))
  }
}
