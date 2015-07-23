export default (results, params) => {
  let {wordClass, tag, limit} = params

  return results
    .filter(word => wordClass ? word.wordClass === wordClass : true)
    .filter(word => tag ? word.grammarTag === tag : true)
    .slice(0, limit)
}
