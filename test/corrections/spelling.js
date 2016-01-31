import assert from 'assert'
import {generateSuggestions, filterSuggestions} from '../../corrections/spelling'

describe('Generates suggestions by replacing lettes', () => {
  it('suggests a single letter replacements', () => {
    let results = generateSuggestions('eg')
    assert.deepEqual(['ég'], results)
  })

  it('suggests multiple replacements for many replacable letters', () => {
    let results = generateSuggestions('utland')
    assert.deepEqual(['utlánd', 'útland', 'utlanð'], results)
  })

  it('suggests replacements for double letter pairs', () => {
    let results = generateSuggestions('Baering')
    assert.deepEqual(['Báering', 'Baéring', 'Baeríng', 'Bæring'], results)
  })
})

describe('Filters suggestions to words that exist in the database', () => {
  it('suggests a single replacement', () => {
    return filterSuggestions(['ég']).then(results => {
      assert.deepEqual(['ég'], results)
    })
  })

  it('picks the correct suggestion from a list with one correct suggestion', () => {
    return filterSuggestions(['utlánd', 'útland', 'utlanð']).then(results => {
      assert.deepEqual(['útland'], results)
    })
  })

  it('picks the correct suggestion from a list with one correct suggestion 2', () => {
    return filterSuggestions(['Báering', 'Baéring', 'Baeríng', 'Bæring']).then(results => {
      assert.deepEqual(['Bæring'], results)
    })
  })
})

describe('Corrects the spelling of mispelled words', function() {
  it('corrects eg to ég')
  it('corrects utland to útland')
  it('corrects Baering to Bæring')
  it('corrects Thor to Þór')
  it('corrects thad to það')
})
