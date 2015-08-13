import matchers from './tags'

let lookup = {
  // Nouns
  'kk': ['case', 'number', 'article'],
  'kvk': ['case', 'number', 'article'],
  'hk': ['case', 'number', 'article'],

  // Verb
  'so': ['voice', 'mood', 'tense', 'person', 'number'],

  // Pronoun
  'pfn': ['case', 'number'],

  // Adjective
  'lo': ['degree', 'gender', 'case', 'number'],

  // Reflexive pronoun
  'abfn': ['case'],

  // Other pronoun
  'fn': ['gender', 'case', 'number'],

  // Numeral
  'to': ['gender', 'case', 'number']
}

export default (grammarTag, wordClass) => {
  let tags = {
    case: {
      NF: matchers.isNominative(grammarTag),
      ÞF: matchers.isAccusative(grammarTag),
      ÞGF: matchers.isDative(grammarTag),
      EF: matchers.isGenitive(grammarTag)
    },
    number: {
      ET: matchers.isSingular(grammarTag),
      FT: matchers.isPlural(grammarTag)
    },
    article: {
      '': matchers.isIndefinite(grammarTag, wordClass),
      'gr': matchers.isDefinite(grammarTag)
    },
    gender: {
      KK: matchers.isMasculine(grammarTag, wordClass),
      KVK: matchers.isFeminine(grammarTag, wordClass),
      HK: matchers.isNeuter(grammarTag, wordClass)
    },
    person: {
      '1P': matchers.isFirstPerson(grammarTag),
      '2P': matchers.isSecondPerson(grammarTag),
      '3P': matchers.isThirdPerson(grammarTag)
    },
    tense: {
      'NT': matchers.matchesTags(grammarTag, 'NT'),
      'ÞT': matchers.matchesTags(grammarTag, 'ÞT')
    },
    mood: {
      'FH': matchers.matchesTags(grammarTag, 'FH'),
      'VH': matchers.matchesTags(grammarTag, 'VH')
    },
    degree: {
      'FSB': matchers.isPositive(grammarTag),
      'FVB': matchers.matchesTags(grammarTag, 'FVB'),
      'MST': matchers.isComparative(grammarTag),
      'ESB': matchers.isSuperlative(grammarTag),
      'EVB': matchers.matchesTags(grammarTag, 'EVB')
    },
    voice: {
      'GM': matchers.matchesTags(grammarTag, 'GM')
    }
  }

  let results = {}

  if (lookup[wordClass]) {
    lookup[wordClass].forEach(prop => results[prop] = tags[prop])
  }

  return results
}
