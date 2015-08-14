import assert from 'assert'
import summary from '../controllers/summary';

describe('Prepositions', () => {

  it('should return definite noun for definite noun input', () => {
    return summary.preposition('um dagurinn')
      .then(results => assert.deepEqual(results.results, [{ "ÞF": "um daginn" }]))
  })

  it('should return multiple results for prepositions that have multiple cases', () => {
    return summary.preposition('í búðin')
      .then(results => assert.deepEqual(results.results, [
        { "ÞF": "í búðina" },
        { "ÞGF": "í búðinni" }
      ]))
  })

  it('should return matching proper nouns', () => {
    return summary.preposition('til Ægir')
      .then(results => assert.deepEqual(results.results, [{ "EF": "til Ægis" }]))
  })

  it('should return matching pronouns', () => {
    return summary.preposition('frá hann')
      .then(results => assert.deepEqual(results.results, [{ "ÞGF": "frá honum" }]))
  })
})
