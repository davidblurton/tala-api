import assert from 'assert'
import summary from '../controllers/summary';

describe('Preposition', () => {
  describe('find', () => {
    it('should return definite noun for definite noun input', () => {
      return summary.preposition('um dagurinn')
        .then(results => assert.deepEqual(results, {
          "accusative": [{
            "_id": "dagur;5752;kk;alm;daginn;ÞFETgr",
            "_url": "/id/5752~dagur;5752;kk;alm;daginn;ÞFETgr",
            "binId": "5752",
            "grammarTag": "ÞFETgr",
            "headWord": "dagur",
            "section": "alm",
            "wordClass": "kk",
            "wordForm": "daginn"
          }]
        }))
    })
  })
})
