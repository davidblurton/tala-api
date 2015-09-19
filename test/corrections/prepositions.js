import assert from 'assert'
import corrections from '../../controllers/sentence'
import {structure} from '../../grammar/parsed'

describe('Corrects verb object agreement', async function() {
  it.skip('it should change the case of objects to match verbs', async function() {
    let tokenized = ['ég', 'tala', 'íslenska']
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ>":{"[NP":{"WORDS":[{"ég":"fp1en"}]}},"[VP":{"WORDS":[{"tala":"sfg1en"}]},"{*OBJ<":{"[AP":{"WORDS":[{"íslenska":"lkfosf"}]}}}}}'

    let parts = structure(parsedQuery)
    let result = await corrections.preposition(tokenized, parts)

    let expectedReplacements = ['íslensku']

    assert.deepEqual(result.replacements, expectedReplacements)
  })

  it.skip('it should change the case of objects to match verbs2', async function() {
    // Can't correct adjectives yet.
    let query = 'Af hverju er himinninn blá?'
    let parsedQuery = '[PP Af aþ [NP hverju fsheþ ] ] [VPb er sfg3en ] {*SUBJ< [NP himinninn nkeng ] } {*COMP<?Cg? [AP blá lvensf ] } ? ?'
    let expected = 'Af hverju er himinninn blár?'

    let result = await corrections.preposition(query, parsedQuery)

    assert.deepEqual(result, expected)
  })
})
