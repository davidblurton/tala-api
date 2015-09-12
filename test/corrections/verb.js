import assert from 'assert'
import corrections from '../../controllers/corrections';
import {structure} from '../../grammar/parsed'

describe.only('Corrects subject verb agreement', async function() {
  this.timeout(5000)

  it('should find the correct verb for a pronoun subject', async function() {
    let tokenized = ['hann', 'tala', 'íslensku']
    let parsedQuery = '[NP Hann fpkeo ] [VP tala sfg3fn ] {*COMP [AP íslensku lkfnvf ] }'

    let expected = {
      rule: 'verb should match subject',
      index: 1,
      replacements: ['talar', 'talaði']
    }

    let parts = structure(parsedQuery)
    let result = await corrections.verb(tokenized, parts)

    assert.deepEqual(result, expected)
  })

  it('should find the correct verb for a pronoun subject2', async function() {
    let tokenized = ['við', 'talar', 'íslensku']
    let parsedQuery = '{*SUBJ> [NP við fp1fn ] } [VP?VnVp? talar sfg3en ] {*OBJ< [NP íslensku nveþ ] }'

    let expected = {
      rule: 'verb should match subject',
      index: 1,
      replacements: ['tölum', 'töluðum']
    }

    let parts = structure(parsedQuery)
    let result = await corrections.verb(tokenized, parts)

    assert.deepEqual(result, expected)
  })

  it('should find the correct verb when the verb comes first')
  it('should find the correct verb for a noun subject')
})
