import assert from 'assert'
import {parse, toString} from '../../grammar/parser';

const testCases = {
  'FVB-KK-NFET': {definite: 'FVB', gender: 'KK', grammarCase: 'NF', number: 'ET'},
  'FVB-KVK-NFET': {definite: 'FVB', gender: 'KVK', grammarCase: 'NF', number: 'ET'},
}

describe('Parse adjectives', () => {
  const wordClass = 'lo'

  Object.keys(testCases).forEach(input => {
    it(`should parse ${input}`, () => {
      let parsed = parse(wordClass, input)
      let expected = testCases[input]

      assert.deepEqual(parsed, expected)
      assert.equal(toString(wordClass, parsed), input)
    })
  })
})
