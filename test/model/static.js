import assert from 'assert'
import lookupVerb from '../../models/static'

const testCases = {
  'tefja': ['ÞF'],
  'vernda': ['ÞF']
}

describe('Lookup static verb rules', () => {
  it(`should not include asdf`, async function() {
    let result = await lookupVerb('asdf')
    assert.deepEqual(result, null)
  })

  Object.keys(testCases).forEach(input => {
    it(`should include ${input}`, async function() {
      let result = await lookupVerb(input)
      let expected = testCases[input]

      assert.deepEqual(result, expected)
    })
  })
})
