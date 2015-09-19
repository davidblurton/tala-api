import {parse} from '../grammar/parser'

function isNoun(word) {
  return ['hk', 'kvk', 'kk'].includes(word.wordClass)
}

function isAdjective(word) {
  return word.wordClass === 'lo'
}

function getTags(nouns, degree) {

  let results = {
    'F': getTags(nouns, 'F'),
    'MST': getTags(nouns, 'MST'),
  }



      //'E': getTags(nouns, 'E')

  return nouns.map(noun => {
    let parsed = parse(noun.wordClass, noun.grammarTag)
    let definite

    if (degree.length === 1) {
      definite = degree + (parsed.article ? 'VB' : 'SB')
    } else {
      definite = degree
    }

    return `${definite}-${noun.wordClass.toUpperCase()}-${parsed.grammarCase}${parsed.number}`
  })
}

function getDeterminerTags(nouns) {
  return {
    'determiner': nouns.map(noun => {
      let parsed = parse(noun.wordClass, noun.grammarTag)
      return `${noun.wordClass.toUpperCase()}-${parsed.grammarCase}${parsed.number}`
    })
  }
}

export default (words, hasDegree) => {
  let nouns = words.filter(isNoun)

  if (hasDegree) {
    return {
      wordClass: 'lo',
      grammarTag: {
        'F': getTags(nouns, 'F'),
        'MST': getTags(nouns, 'MST'),
        'E': getTags(nouns, 'E')
      }
    }
  } else {
    return {
      wordClass: 'lo',
      grammarTag: {
        'determiner': getDeterminerTags(nouns)
      }
    }
  }
}
