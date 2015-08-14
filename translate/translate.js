import lookup from './translate.json'
import _ from 'lodash'

export default (results, language) => {
  if (language) {
    return results.map(result => _.mapKeys(result, (value, tag) => lookup[language].grammarTag[tag] || tag))
  }

  return results
}
