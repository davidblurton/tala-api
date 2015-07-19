export default (results, queries) => {
  let wordClass = queries.wordClass
  let tag = queries.grammarTag

  return results
    .filter(x => wordClass ? x.wordClass === wordClass : true)
    .filter(x => tag ? x.grammarTag.includes(tag) : true)
}
