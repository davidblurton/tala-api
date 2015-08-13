import lookup from './translate.json'
import _ from 'lodash'

export default (result, language) => {
  if (language) {
    return _.mapKeys(result, (value, tag) => lookup[language].grammarTag[tag] || tag)
  }

  return result
}
