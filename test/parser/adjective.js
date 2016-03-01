import assert from 'assert'
import {parse, toString} from '../../grammar/parser'

const testCases = {
  'FVB-KK-NFET': {degree: 'FVB', gender: 'KK', grammarCase: 'NF', number: 'ET'},
  'FVB-KVK-NFET': {degree: 'FVB', gender: 'KVK', grammarCase: 'NF', number: 'ET'},
  'FSB-KVK-NFET': {degree: 'FSB', gender: 'KVK', grammarCase: 'NF', number: 'ET'},
  'MST-KK-NFET': {degree: 'MST', gender: 'KK', grammarCase: 'NF', number: 'ET'},
  'EVB-KK-NFET': {degree: 'EVB', gender: 'KK', grammarCase: 'NF', number: 'ET'},
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
