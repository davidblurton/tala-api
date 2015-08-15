import lookup from './translate.json'
import _ from 'lodash'

export default (results, language) => {
  if (language) {
    return _.mapKeys(results, (value, tag) => lookup[language].grammarTag[tag] || tag)
  }

  return results
}
