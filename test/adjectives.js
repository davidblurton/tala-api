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
    let results = await summary.adjective('stór', 'hestur')
    let formatted = adjectiveFormatter(results, 'hestur')

    assert.deepEqual(formatted.results, {
      "E": "stærsti hestur",
      "F": "stóri hestur",
      "MST": "stærri hestur",
    })
  })
})
