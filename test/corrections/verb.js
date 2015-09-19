import assert from 'assert'
import {verb} from '../../rules'
import {structure} from '../../grammar/parsed'

describe('Corrects subject verb agreement', async function() {
  it('should find the correct verb for a pronoun subject', async function() {
    let tokenized = ['hann', 'tala', 'íslensku']
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ":{"[NP":{"WORDS":[{"hann":"fpken"}]}},"[VPi":{"WORDS":[{"tala":"sng"}]},"{*OBJ<":{"[NP":{"WORDS":[{"íslensku":"nveo"}]}}}}}'

    let parts = structure(parsedQuery)
    let result = await verb(tokenized, parts)

    assert.deepEqual(result.modifierIndex, 0)
    assert.deepEqual(result.targetIndex, 1)
    assert.deepEqual(result.replacements, ['talar', 'talaði'])
  })

  it('should find the correct verb when the verb comes first')
  it('should find the correct verb for a noun subject')
})
