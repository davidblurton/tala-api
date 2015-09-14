import assert from 'assert'
import lookup from '../../models/icenlp'

const query = 'Ég bý með íslenskri konu'

const expected = {
  tokenized: ['Ég', 'bý', 'með', 'íslenskri', 'konu'],
  tagged: [
    'Ég fp1en (Ég)',
    'bý sfg1en (búa)',
    'með aþ (með)',
    'íslenskri lveþsf (íslenskur)',
    'konu nveþ (kona)'
  ],
}

describe('Lookup data from icenlp', () => {
  it(`get results`, async function() {
    let result = await lookup(query)
    assert.deepEqual(result.tokenized, expected.tokenized)
    assert.deepEqual(result.tagged, expected.tagged)
  })
})
