import assert from 'assert'
import numeral from '../grammar/numeral'

let cases = {
  'HK_NFFT': {
    gender: 'HK',
    case: 'NF',
    number: 'FT'
  },
  'KVK_ÞGFFT': {
    gender: 'KVK',
    case: 'ÞGF',
    number: 'FT'
  }
};

describe('Grammar Tag Parser', () => {
  describe('parse', () => {
    it('should parse numeral tag', () => {

      Object.keys(cases).forEach(grammarTag =>  {
        assert.deepEqual(numeral.parse('to', grammarTag), cases[grammarTag])
      })
    })
  })
})
