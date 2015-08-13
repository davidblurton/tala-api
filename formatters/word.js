import _ from 'lodash'

export default (results, lang) => {
  return {
    count: results.length,
    wordClasses: _.unique(results.map(x => x.wordClass)),
    results: results
  }
}
