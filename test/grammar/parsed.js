import assert from 'assert'
import corrections from '../../controllers/corrections';
import {structure} from '../../grammar/parsed'

describe('Parses parts of a sentence', async function() {
  it('it detects SVO', () => {
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ":{"[NP":{"WORDS":[{"hann":"fpken"}]}},"[VPi":{"WORDS":[{"tala":"sng"}]},"{*OBJ<":{"[NP":{"WORDS":[{"íslensku":"nveo"}]}}}}}'
    let result = structure(parsedQuery)

    assert.equal(result.subject.word, 'hann')
    assert.equal(result.verb.word, 'tala')
    assert.equal(result.object.word, 'íslensku')
  })

  it('detect the second subject as the object', () => {
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ":{"[NP":{"WORDS":[{"hann":"fpken"}]}},"[VPi":{"WORDS":[{"gleyma":"sng"}]},"{*SUBJ":{"[NP":{"WORDS":[{"lykillinn":"nkeng"}]}}}}}'
    let result = structure(parsedQuery)

    assert.equal(result.subject.word, 'hann')
    assert.equal(result.object.word, 'lykillinn')
  })

  it('detects the second noun as the object', () => {
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ>":{"[NP":{"WORDS":[{"hann":"fpken"}]}},"[VP":{"WORDS":[{"talar":"sfg3en"}]},"[AP":{"WORDS":[{"íslenska":"lvenvf"}]}}}}'
    let result = structure(parsedQuery)

    assert.equal(result.subject.word, 'hann')
    assert.equal(result.object.word, 'íslenska')
  })

  it('filters out adverbs from object', () => {
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ>":{"[NP":{"WORDS":[{"hann":"fpken"}]}},"[VP":{"WORDS":[{"talar":"sfg3en"}]},"[AP":{"[AdvP":{"WORDS":[{"ekki":"aa"}]},"WORDS":[{"íslenska":"lvenvf"}]}}}}'
    let result = structure(parsedQuery)

    assert.equal(result.object.word, 'íslenska')
  })
})
