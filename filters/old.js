import _ from 'lodash'

let firstOrDefault = array => array ? array[0] : '';

export default {
  exact(array, property, value) {
    return array.filter(x => value ? x[property] === value : true)
  },

  includes(array, property, values) {
    if (_.isPlainObject(values)) {
      return _.mapValues(values, prop => this.each(array, 'grammarTag', prop))
    } else {
      return array.filter(values ? x => values.every(value => x[property].includes(value)) : true)
    }
  },

  any(array, property, values) {
    return array.filter(values ? x => values.some(value => x[property].includes(value)) : true)
  },

  each(array, property, values) {
    return values.map(tag => firstOrDefault(array.filter(x => x && x[property] === tag)))
  }
}