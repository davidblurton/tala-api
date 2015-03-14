export default {
  exact(array, property, value) {
    return array.filter(x => value ? x[property] === value : true)
  },

  includes(array, property, values) {
    return array.filter(values ? x =>
      values.every(value => x[property].includes(value))
    : true)
  }
}
