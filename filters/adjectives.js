import {parse} from '../grammar/parser'

function isNoun(word) {
  return ['hk', 'kvk', 'kk'].includes(word.wordClass)
}

function isAdjective(word) {
  return word.wordClass === 'lo'
}

function getTags(nouns, degree) {
  return nouns.map(noun => {
    let parsed = parse(noun.wordClass, noun.grammarTag)
    let definite;

    if (!degree) {
      return `${noun.wordClass.toUpperCase()}-${parsed.grammarCase}${parsed.number}`
    }

    if (degree.length === 1) {
      definite = degree + (parsed.article ? 'VB': 'SB')
    } else {
      definite = degree
    }

    return `${definite}-${noun.wordClass.toUpperCase()}-${parsed.grammarCase}${parsed.number}`
  })
}

export default (words, hasDegree) => {
  let nouns = words.filter(isNoun)

  if (hasDegree) {
    return {
      wordClass: 'lo',
      grammarTag: {
        'F': getTags(nouns, 'F'),
        'MST': getTags(nouns, 'MST'),
        'E': getTags(nouns, 'E'),
      }
    }
  } else {
    return {
      wordClass: 'lo',
      grammarTag: {
        'determiner': getTags(nouns)
      }
    }
  }
}
