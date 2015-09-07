import _ from 'lodash';
import translate from '../translate/translate'

export default (results, query, lang) => {
  let formattedResults = results.map(result => _.mapValues(result, x => `${query} ${x.wordForm}`))
  console.log(formattedResults)

  return {
    query: query,
    results: lang ? translate(formattedResults, lang) : formattedResults,
  }
}
