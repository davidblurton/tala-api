import matchers from './tags'

var lookup = {
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
  'to': ['gender', 'case']
}

export default (tags, wordClass) => {
  var tags = {
    case: {
      NF: matchers.isNominative(tags),
      ÞF: matchers.isAccusative(tags),
      ÞGF: matchers.isDative(tags),
      EF: matchers.isGenitive(tags)
    },
    number: {
      ET: matchers.isSingular(tags),
      FT: matchers.isPlural(tags)
    },
    article: {
      '': matchers.isIndefinite(tags, wordClass),
      'gr': matchers.isDefinite(tags)
    },
    gender: {
      KK: matchers.isMasculine(tags, wordClass),
      KVK: matchers.isFeminine(tags, wordClass),
      HK: matchers.isNeuter(tags, wordClass)
    },
    person: {
      '1P': matchers.isFirstPerson(tags),
      '2P': matchers.isSecondPerson(tags),
      '3P': matchers.isThirdPerson(tags)
    },
    tense: {
      'NT': matchers.matchesTags(tags, 'NT'),
      'ÞT': matchers.matchesTags(tags, 'ÞT')
    },
    mood: {
      'FH': matchers.matchesTags(tags, 'FH'),
      'VH': matchers.matchesTags(tags, 'VH')
    },
    degree: {
      'FSB': matchers.isPositive(tags),
      'FVB': matchers.matchesTags(tags, 'FVB'),
      'MST': matchers.isComparative(tags),
      'ESB': matchers.isSuperlative(tags),
      'EVB': matchers.matchesTags(tags, 'EVB')
    },
    voice: {
      'GM': matchers.matchesTags(tags, 'GM')
    }
  }

  var results = {}

  if (lookup[wordClass]) {
    lookup[wordClass].forEach(prop => results[prop] = tags[prop])
  }

  return results
}
