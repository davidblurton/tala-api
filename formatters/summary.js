import _ from 'lodash';

export default (results, query) => {
  let formattedResults = _.mapValues(results, x => `${query} ${x.wordForm}`)

  return {
    query: query,
    results: [formattedResults]
  }
}
