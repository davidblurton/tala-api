import assert from 'assert'
import summary from '../controllers/summary';

describe('Verbs', () => {

  it.skip('should return verb with correct person', () => {
    return summary.preposition('ég fara')
      .then(results => assert.deepEqual(results.results, [{ "present": "ég fer" }]))
  })
})
