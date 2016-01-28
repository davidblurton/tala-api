import assert from 'assert'
import {structure} from '../../grammar/parsed'

describe('Parses parts of a sentence', () => {
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

  it('detects a preposition and matching object', () => {
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ>":{"[NP":{"WORDS":[{"ég":"fp1en"}]}},"[VP":{"WORDS":[{"fer":"sfg1en"}]},"[PP":{"WORDS":[{"í":"ao"}],"[NP":{"WORDS":[{"búðina":"nveog"}]}}}}}'
    let result = structure(parsedQuery)

    assert.equal(result.preposition.word, 'í')
    assert.equal(result.prepositionObject.word, 'búðina')
  })

  it('matches the object with the preposition and not the verb', () => {
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ>":{"[NP":{"WORDS":[{"ég":"fp1en"}]}},"[VP":{"WORDS":[{"tala":"sfg1en"}]},"[AdvP":{"WORDS":[{"við":"aa"}]},"{*SUBJ":{"[NP":{"WORDS":[{"hún":"fpven"}]}}}}}'
    let result = structure(parsedQuery)

    assert.equal(result.preposition.word, 'við')
    assert.equal(result.prepositionObject.word, 'hún')
  })

  it.skip('matches the object with verbs in the infinitive', () => {
    let parsedQuery = '{"Parsed Text":{"Sentence":{"{*SUBJ>":{"[NP":{"WORDS":[{"ég":"fp1en"}]}},"[VPb":{"WORDS":[{"er":"sfg1en"}]},"[VPi":{"WORDS":[{"að":"cn","læra":"sng"}]},"{*OBJ<":{"[AP":{"WORDS":[{"íslenska":"lveosf"}]}}}}}'
    let result = structure(parsedQuery)

    assert.equal(result.verb.word, 'læra')
    assert.equal(result.object.word, 'íslenska')
  })
})
