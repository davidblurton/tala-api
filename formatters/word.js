import _ from 'lodash'
import {parse} from '../grammar/parser'
import lookup from '../translate/translate.json'

function sort(results) {
  return _.sortBy(results, x => {
    let rank = {
      nominative: 1,
      accusative: 2,
      dative: 3,
      genitive: 4,
    }
    return rank[x.tags && x.tags.grammarCase]
  })
}

function translate(tags, language) {
  return _.mapValues(tags, tag => lookup[language].grammarTag[tag] || tag)
}

export default (results, lang) => {
  results.forEach(result => {
    try {
      let tags = parse(result.wordClass, result.grammarTag)
      result.tags = translate(tags, 'en')
    } catch(e) {
      result.tags = {}
    }
  })

  return {
    count: results.length,
    wordClasses: _.unique(results.map(x => x.wordClass)),
    results: sort(results),
  }
}

