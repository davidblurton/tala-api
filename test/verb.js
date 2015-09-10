import assert from 'assert'
import summary from '../controllers/summary';
import summaryFormatter from '../formatters/summary'

describe('Verbs', () => {

  it('should return past and present verbs with correct person', async function() {
    let results = await summary.verb('ég', 'fara')
    let formatted = summaryFormatter(results, 'ég')

    assert.deepEqual(formatted.results, [{
      "NT": "ég fer",
      "ÞT": "ég fór",
    }])
  })
})
