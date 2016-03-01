import assert from 'assert'
import {parse, toString} from '../../grammar/parser'

const testCases = {
  'NFET': {grammarCase: 'NF', number: 'ET', article: ''},
  'NFETgr': {grammarCase: 'NF', number: 'ET', article: 'gr'},
  'NFFT': {grammarCase: 'NF', number: 'FT', article: ''},
  'NFFTgr': {grammarCase: 'NF', number: 'FT', article: 'gr'},
  'ÞFET': {grammarCase: 'ÞF', number: 'ET', article: ''},
  'ÞFETgr': {grammarCase: 'ÞF', number: 'ET', article: 'gr'},
  'ÞFFT': {grammarCase: 'ÞF', number: 'FT', article: ''},
  'ÞFFTgr': {grammarCase: 'ÞF', number: 'FT', article: 'gr'},
  'ÞGFET': {grammarCase: 'ÞGF', number: 'ET', article: ''},
  'ÞGFETgr': {grammarCase: 'ÞGF', number: 'ET', article: 'gr'},
  'ÞGFFT': {grammarCase: 'ÞGF', number: 'FT', article: ''},
  'ÞGFFTgr': {grammarCase: 'ÞGF', number: 'FT', article: 'gr'},
  'EFET': {grammarCase: 'EF', number: 'ET', article: ''},
  'EFETgr': {grammarCase: 'EF', number: 'ET', article: 'gr'},
  'EFFT': {grammarCase: 'EF', number: 'FT', article: ''},
  'EFFTgr': {grammarCase: 'EF', number: 'FT', article: 'gr'},
}

describe('Parse nouns', () => {
  const wordClass = 'hk'

  Object.keys(testCases).forEach(input => {
    it(`should parse ${input}`, () => {
      let parsed = parse(wordClass, input)
      let expected = testCases[input]
      expected.gender = wordClass.toUpperCase()

      assert.deepEqual(parsed, expected)
      assert.equal(toString(wordClass, parsed), input)
    })
  })
})
