import _ from 'lodash'
import translate from '../translate/translate'

export default (results, lang) => {
  return {
    count: results.length,
    wordClasses: _.unique(results.map(x => x.wordClass)),
    results: results.map(result => translate(result, lang))
  }
}
