import mapTags from '../translate/mapTags'
import _ from 'lodash'

let parse = (wordClass, grammarTag) =>  {
  let mapped = mapTags(grammarTag, wordClass)

  return _.mapValues(mapped, prop => {
    return Object.keys(prop).filter(key => {
      return prop[key]
    })[0]
  })
}

let toString = obj => {

}

export default {
  parse: parse,
  toString: toString
}
