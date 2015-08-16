import _ from 'lodash';
import translate from '../translate/translate'

export default (results, query, lang) => {
  let formattedResults = _.mapValues(results, x => `${x.wordForm} ${query}`)

  return {
    query: query,
    results: lang ? translate(formattedResults, lang) : formattedResults,
  }
}
