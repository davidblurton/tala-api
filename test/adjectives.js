import assert from 'assert'
import summary from '../controllers/summary';
import adjectiveFormatter from '../formatters/adjective'

describe('Adjectives', () => {

  it.skip('should return adjectives that match the noun', async function() {
    let results = await summary.adjective('góða', 'veður')
    let formatted = adjectiveFormatter(results, 'góða')

    assert.deepEqual(formatted.results, {
      "ESB": "gott veður",
      "FSB": "best veður",
    })
  })

  it('should return adjectives that match noun', async function() {
    let results = await summary.adjective('stór', 'hesturinn')
    let formatted = adjectiveFormatter(results, 'hesturinn')

    assert.deepEqual(formatted.results, {
      "F": "stóri hesturinn",
      "MST": "stærri hesturinn",
      "E": "stærsti hesturinn",
    })
  })
})
