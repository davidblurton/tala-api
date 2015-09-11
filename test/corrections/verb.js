import assert from 'assert'
import corrections from '../../controllers/corrections';

describe('Corrects subject verb agreement', async function() {

  it('should find the correct verb for a pronoun subject', async function() {
    let query = 'hann tala íslensku'
    let parsedQuery = '[NP Hann fpkeo ] [VP tala sfg3fn ] {*COMP [AP íslensku lkfnvf ] }'
    let expected = ['hann talar íslensku', 'hann talaði íslensku']

    let result = await corrections.verb(query, parsedQuery)

    assert.deepEqual(result, expected)
  })

  it('should find the correct verb for a pronoun subject2', async function() {
    let query = 'við talar íslensku'
    let parsedQuery = '{*SUBJ> [NP við fp1fn ] } [VP?VnVp? talar sfg3en ] {*OBJ< [NP íslensku nveþ ] }'
    let expected = ['við tölum íslensku', 'við töluðum íslensku']

    let result = await corrections.verb(query, parsedQuery)

    assert.deepEqual(result, expected)
  })
})
