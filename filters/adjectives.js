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

    if (degree.length === 1) {
      definite = degree + (parsed.article ? 'SB' : 'VB')
    } else {
      definite = degree
    }

    return `${definite}-${noun.wordClass.toUpperCase()}-${parsed.grammarCase}${parsed.number}`
  })
}

export default words => {
  let nouns = words.filter(isNoun)

  return {
    wordClass: 'lo',
    grammarTag: {
      'F': getTags(nouns, 'F'),
      'E': getTags(nouns, 'E'),
      'MST': getTags(nouns, 'MST'),
    }
  }
}
