import assert from 'assert'
import {parse, toString} from '../translate/parser';

var testCases = [
  'ÞFET',
  'EFFT',
  'ÞFFT',
  'ÞFFTgr',
  'EFFTgr',
  'NFFT',
  'NFFTgr',
  'ÞGFET',
  'ÞFETgr',
  'ÞGFETgr',
  'EFET',
  'EFETgr',
  'ÞGFFT',
  'ÞGFFTgr',
  'NFET',
  'NFETgr'
]

describe('Parser', () => {

  it('should parse nouns', () => {
    testCases.forEach(grammarTag => {
      var parsed = parse(grammarTag)
      assert.equal(toString(parsed), grammarTag)
    })
  })

})
