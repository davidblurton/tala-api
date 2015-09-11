import assert from 'assert'
import {structure, wordFromPart} from '../grammar/parsed'

describe('Understands parsed output from icenlp', () => {
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

  it(`identifies verb in a sentence where the subject and verb don't match`, () => {
    const parsed = '{*SUBJ> [NP við fp1fn ] } [VP?VnVp? talar sfg3en ] {*OBJ< [NP íslensku nveþ ] } '
    const expected = {
      subject: 'NP við fp1fn',
      verb: 'VP?VnVp? talar sfg3en'
    }

    let result = structure(parsed)
    assert.deepEqual(result, expected)
  })

  it('extracts the word from a part', () => {
    const subject = 'NP Ég fp1en'

    let result = wordFromPart(subject)
    assert.equal(result, 'Ég')
  })
})
