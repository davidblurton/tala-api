export default (data, query, word) => {
  let result = {};

  result.word = word
  result.query = query
  result.filters = {}

  if (data[query]) {
    result.filters = data[query];
  }

  return result
}
