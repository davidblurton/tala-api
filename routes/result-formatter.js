import translate from '../translate/translate'

export default (results, lang) => {
  return {
    count: results.length,
    results: results.map(result => translate(result, lang))
  }
}
