import _ from 'lodash'
import database from '../models/database'
import getPrepositionFilters from '../filters/prepositions'
import oldFilters from '../filters/old'

export default {
  // Generates a list of autocompletion suggestions.
  suggestions(prefix, limit) {
    return database.search(prefix)
      .then(results => results.filter(x => x.headWord === x.wordForm)) // this should be a filter
      .then(results => results.map(x => x.wordForm))
      .then(_.unique)
      .then(results => results.slice(0, limit))
  },

  // Are there matching words from multiple headwords.
  multiple(word) {
    return database.lookup(word)
      .then(results => {
        let ids = results.map(result => result.binId)
        return !ids.every(id => id === ids[0])
      })
  },

  // Find all words from the same headword.
  related(word) {
    return database.lookup(word)
      .then(results => _.chain(results).pluck('binId').unique().value())
      .then(ids => Promise.all(ids.map(id => database.lookup(id))))
      .then(results => _.flatten(results))
  },

  preposition(words) {
    let parsed = words.split(' ')
    let modifier = (parsed[0] || '').toLowerCase()
    let word = (parsed[1] || '').toLowerCase()

    return database.lookup(word).then(nouns =>  {
      let filters = getPrepositionFilters(modifier, nouns)

      if (filters) {
        let {wordClass, grammarTag} = filters;

        return this.related(word)
          .then(results => oldFilters.any(results, 'wordClass', wordClass))
          .then(results => oldFilters.includes(results, 'grammarTag', grammarTag))
      } else {
        return Promise.resolve([])
      }
    })


  }
}
