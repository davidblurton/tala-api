import assert from 'assert'
import corrections from '../../controllers/corrections';
import {structure} from '../../grammar/parsed'

describe.only('Parses parts of a sentence', async function() {
  it('it detects SVO', () => {
    let parsedQuery = '{*SUBJ [NP hann fpken ] } [VPi tala sng ] {*OBJ< [NP íslensku nveo ] } '
    let result = structure(parsedQuery)

    assert.equal(result.subject, 'NP hann fpken')
    assert.equal(result.verb, 'VPi tala sng')
    assert.equal(result.object, 'NP íslensku nveo')
  })

  it('detect the second subject as the object', () => {
    let parsedQuery = '{*SUBJ [NP hann fpken ] } [VPi gleyma sng ] {*SUBJ [NP lykillinn nkeng ] }'
    let result = structure(parsedQuery)

    assert.equal(result.subject, 'NP hann fpken')
    assert.equal(result.object, 'NP lykillinn nkeng')
  })

  it('detects the second noun as the object', () => {
    let parsedQuery = '{*SUBJ> [NP hann fpken ] } [VP talar sfg3en ] [AP íslenska lvenvf ] '
    let result = structure(parsedQuery)

    assert.equal(result.subject, 'NP hann fpken')
    assert.equal(result.object, 'AP íslenska lvenvf')
  })

  it('filters out adverbs from object', () => {
    let parsedQuery = '{*SUBJ> [NP hann fpken ] } [VP talar sfg3en ] [AP [AdvP ekki aa ] íslenska lvenvf ] '
    let result = structure(parsedQuery)

    assert.equal(result.object, 'AP íslenska lvenvf')
  })
})
