import _ from 'lodash';

const pronouns = ['ég', 'þú', 'hann/hún/það', 'við', 'þið', 'þeir/þær/þau']

export default (results, query) => {
  if (!Array.isArray(results)) {
    results = [results]
  }

  return results.map(result => {
    return _.mapValues(result, values => {
      let wordForms = values.map(x => x && `${query} ${x.wordForm}`);
      //return values.length === 6 ? _.zipWith(pronouns, wordForms, (a, b) => `${a} ${b}`) : wordForms
      return wordForms;
    })
  })
}
