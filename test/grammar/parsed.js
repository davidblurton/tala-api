import assert from 'assert'
import corrections from '../../controllers/corrections';
import {structure} from '../../grammar/parsed'

const input1 =
`hann tala íslensku

hann fpken (hann)
tala sng (tala)
íslensku nveo (íslenska)




{*SUBJ [NP hann fpken ] } [VPi tala sng ] {*OBJ< [NP íslensku nveo ] } `

describe('Parses parts of a sentence', async function() {
  it('it detects SVO', async function() {
    let result = structure(input1)

    let expected = {
      subject: 'NP hann fpken',
      verb: 'VPi tala sng',
      object: 'NP íslensku nveo',
    }

    assert.deepEqual(result, expected)
  })

  it.only('detect the second subject as the object', function() {
    let parsedQuery = '{*SUBJ [NP hann fpken ] } [VPi gleyma sng ] {*SUBJ [NP lykillinn nkeng ] }'

    let result = structure(parsedQuery)

    let expected = {
      subject: 'NP hann fpken',
      verb: 'VPi gleyma sng',
      object: 'NP lykillinn nkeng'
    }

    assert.deepEqual(result, expected)
  })
})
