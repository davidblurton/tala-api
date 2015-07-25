import _ from 'lodash';

export default (results, query) => {
  if (!Array.isArray(results)) {
    results = [results]
  }

  return results.map(result =>
    _.mapValues(result, values =>
      values.filter(x => x).map(x => x && `${query} ${x.wordForm}`)
    )
  )
}
