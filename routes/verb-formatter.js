import _ from 'lodash';

const pronouns = ['ég', 'þú', 'hann/hún/það', 'við', 'þið', 'þeir/þær/þau']

export default results => {
  return _.mapValues(results, values => {
    let wordForms = values.map(x => x && x.wordForm);
    return values.length === 6 ? _.zipWith(pronouns, wordForms, (a, b) => `${a} ${b}`) : wordForms
  })
}
