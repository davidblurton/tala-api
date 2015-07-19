import _ from 'lodash'

export default (results, keyword) => {
  return _.chain(results)
    .sortBy('grammarTag')
    .filter(x => x.wordForm)
    .map(x => `${keyword} ${x.wordForm}`)
    .value()
}
