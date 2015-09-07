import {parse, toString, supportedClasses} from '../grammar/parser'

const prepositions = {
  // Accusative
  'fyrir ofan': 'ÞF',
  'gegnum': 'ÞF',
  'kringum': 'ÞF',
  'um': 'ÞF',
  'umfram': 'ÞF',
  'umhverfis': 'ÞF',

  // Dative
  'að': 'ÞGF',
  'af': 'ÞGF',
  'andspænis': 'ÞGF',
  'ásamt': 'ÞGF',
  'frá': 'ÞGF',
  'gagn': 'ÞGF',
  'gagnvart': 'ÞGF',
  'gegnt': 'ÞGF',
  'handa': 'ÞGF',
  'hjá': 'ÞGF',
  'meðfram': 'ÞGF',
  'mót': 'ÞGF',
  'móti': 'ÞGF',
  'nálægt': 'ÞGF',
  'undan': 'ÞGF',
  'úr': 'ÞGF',

  // Genitive
  'án': 'EF',
  'auk': 'EF',
  'austan': 'EF',
  'innan': 'EF',
  'í staö': 'EF',
  'meðal': 'EF',
  'megin': 'EF',
  'milli': 'EF',
  'millum': 'EF',
  'neðan': 'EF',
  'norðan': 'EF',
  'ofan': 'EF',
  'sakir': 'EF',
  'sunnan': 'EF',
  'sökum': 'EF',
  'til': 'EF',
  'utan': 'EF',
  'vegna': 'EF',
  'vestan': 'EF',

  // Accusative or dative
  'á': ['ÞF', 'ÞGF'],
  'eftir': ['ÞF', 'ÞGF'],
  'fyrir': ['ÞF', 'ÞGF'],
  'í': ['ÞF', 'ÞGF'],
  'með': ['ÞF', 'ÞGF'],
  'undir': ['ÞF', 'ÞGF'],
  'við': ['ÞF', 'ÞGF'],
  'yfir': ['ÞF', 'ÞGF'],
}

export default (query, words) => {
  let grammarCases = prepositions[query]

  if (!grammarCases) {
    throw new Error('preposition not found')
  }

  if (!Array.isArray(grammarCases)) {
    grammarCases = [grammarCases]
  }

  let supportedWords = words.filter(x => supportedClasses.includes(x.wordClass))

  if (supportedWords.length === 0) {
    throw new Error('No matching words found')
  }

  return supportedWords.map(word => {
    let parsed = parse(word.wordClass, word.grammarTag)

    let res = {}

    res.wordClass = word.wordClass
    res.grammarTag = {}

    grammarCases.forEach(grammarCase => {
      parsed.grammarCase = grammarCase
      res.grammarTag[grammarCase] = toString(word.wordClass, parsed)
    })

    return res
  })
}
