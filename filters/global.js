export default (results, queries) => {
  let wordClass = queries.wordClass
  let tag = queries.grammarTag
  let limit = queries.limit

  return results
    .filter(x => wordClass ? x.wordClass === wordClass : true)
    .filter(x => tag ? x.grammarTag === tag : true)
    .slice(0, limit)
}
