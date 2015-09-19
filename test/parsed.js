import assert from 'assert'
import {structure, wordFromPart} from '../grammar/parsed'

// Convert examples to json format :(
describe.skip('Understands parsed output from icenlp', () => {
  it(`identifies subject and verb`, () => {
    const parsed = '{*SUBJ> [NP Ég fp1en ] } [VP sá sfg1eþ ] {*OBJ< [NP [AP veiku lveovf ] konuna nveog ] } '
    const expected = {
      subject: 'NP Ég fp1en',
      verb: 'VP sá sfg1eþ',
      object: 'NP [AP veiku lveovf ] konuna nveog'
    }

    let result = structure(parsed)
    assert.deepEqual(result, expected)
  })

  it(`identifies subject in a sentence where the subject and verb don't match`, () => {
    const parsed = '{*SUBJ [NP Hann fpken ] } [VPi tala sng ] {*OBJ< [NP íslensku nveo ] } '
    const expected = {
      subject: 'NP Hann fpken',
      verb: 'VPi tala sng',
      object: 'NP íslensku nveo'
    }

    let result = structure(parsed)
    assert.deepEqual(result, expected)
  })

  it(`identifies verb in a sentence where the subject and verb don't match`, () => {
    const parsed = '{*SUBJ> [NP við fp1fn ] } [VP?VnVp? talar sfg3en ] {*OBJ< [NP íslensku nveþ ] } '
    const expected = {
      subject: 'NP við fp1fn',
      verb: 'VP?VnVp? talar sfg3en',
      object: 'NP íslensku nveþ'
    }

    let result = structure(parsed)
    assert.deepEqual(result, expected)
  })

  it(`identifies verb in a sentence with more than one verb`, () => {
    const parsed = '{*SUBJ> [NP ég fp1en ] } [VPb er sfg1en ] [VPi að cn tala sng ] {*OBJ< [NP íslensku nveo ] } '
    const expected = {
      subject: 'NP ég fp1en',
      verb: 'VPb er sfg1en',
      object: 'NP íslensku nveo'
    }

    let result = structure(parsed)
    assert.deepEqual(result, expected)
  })

  it(`identifies object in a sentence`, () => {
    const parsed = '{*SUBJ> [NP Ég fp1en ] } [VP sakna sfg1en ] {*OBJ< [NP?Aca? þig fp2eo ] } '
    const expected = {
      subject: 'NP Ég fp1en',
      verb: 'VP sakna sfg1en',
      object: 'NP?Aca? þig fp2eo'
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
