import assert from 'assert'
import summary from '../controllers/summary';
import summaryFormatter from '../formatters/summary'

describe('Prepositions', () => {

  it('should return definite noun for definite noun input', async function() {
    let results = await summary.preposition('um', 'dagurinn')
    let formatted = summaryFormatter(results, 'um')

    assert.deepEqual(formatted.results, [{ "ÞF": "um daginn" }])
  })

  it('should return multiple results for prepositions that have multiple cases', async function() {
    let results = await summary.preposition('í', 'búðin')
    let formatted = summaryFormatter(results, 'í')

    assert.deepEqual(formatted.results, [{
      "ÞF": "í búðina",
      "ÞGF": "í búðinni"
    }])
  })

  it('should return matching proper nouns', async function() {
    let results = await summary.preposition('til', 'Ægir')
    let formatted = summaryFormatter(results, 'til')

    assert.deepEqual(formatted.results, [{ "EF": "til Ægis" }])
  })

  it('should return matching pronouns', async function() {
    let results = await summary.preposition('frá', 'hann')
    let formatted = summaryFormatter(results, 'frá')

    assert.deepEqual(formatted.results, [{ "ÞGF": "frá honum" }])
  })
})
