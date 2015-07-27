import _ from 'lodash';

export default (results, query) => {
  if (!Array.isArray(results)) {
    results = [results]
  }

  let formattedResults = results.map(result =>
    _.mapValues(result, values =>
      values.filter(x => x).map(x => x && `${query} ${x.wordForm}`)
    )
  )

  return {
    query: query,
    results: formattedResults
  }
}
