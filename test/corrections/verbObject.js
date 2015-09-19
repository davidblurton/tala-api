import assert from 'assert'
import {verbObject} from '../../rules'
import {structure} from '../../grammar/parsed'

describe('Corrects verb object agreement', function() {
  it.skip('it should change the case of objects to match verbs', async function() {
    let tokenized = ['ég', 'tala', 'íslenska']
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ>":{"[NP":{"WORDS":[{"ég":"fp1en"}]}},"[VP":{"WORDS":[{"tala":"sfg1en"}]},"{*OBJ<":{"[AP":{"WORDS":[{"íslenska":"lkfosf"}]}}}}}'

    let parts = structure(parsedQuery)
    let result = await verbObject(tokenized, parts)
    assert.deepEqual(result.replacements, ['íslensku'])
  })
})
