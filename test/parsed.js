import assert from 'assert'
import {structure, wordFromPart} from '../grammar/parsed'

describe('Understand parsed output from icenlp', () => {
  it(`identifies subject and verb`, () => {
    const parsed = '{*SUBJ> [NP Ég fp1en ] } [VP bý sfg1en ] [PP með aþ [NP [AP íslenskri lveþsf ] konu nveþ ] ]'
    const expected = {
      subject: 'NP Ég fp1en',
      verb: 'VP bý sfg1en'
    }

    let result = structure(parsed)
    assert.deepEqual(result, expected)
  })

  it(`identifies subject in a sentence where the subject and verb don't match`, () => {
    const parsed = '[NP Hann fpkeo ] [VP tala sfg3fn ] {*COMP [AP íslensku lkfnvf ] } '
    const expected = {
      subject: 'NP Hann fpkeo',
      verb: 'VP tala sfg3fn'
    }

    let result = structure(parsed)
    assert.deepEqual(result, expected)
  })

  it('extracts the word from a part', () => {
    let result = wordFromPart(expected.subject)
    assert.equal(result, 'Ég')
  })
})
