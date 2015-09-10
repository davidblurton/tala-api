import _ from 'lodash';
import translate from '../translate/translate'

export default (results, query, lang) => {
  if (!Array.isArray(results)) {
    results = [results]
  }

  let formattedResults = results.map(result => _.mapValues(result, x => `${query} ${x.wordForm}`))

  return {
    query: query,
    results: lang ? translate(formattedResults, lang) : formattedResults,
  }
}
