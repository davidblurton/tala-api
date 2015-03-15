var matchers = require('./tags');

var lookup = {
  // Nouns
  'kk': ['case', 'number', 'article'],
  'kvk': ['case', 'number', 'article'],
  'hk': ['case', 'number', 'article'],
  // Verb
  'so': ['tense', 'mood', 'person', 'number'],
  // Pronoun
  'pfn': ['case', 'number'],
  // Adjective
  'lo': [ 'gender', 'case', 'number']
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
      "1P": matchers.isFirstPerson(tags),
      "2P": matchers.isSecondPerson(tags),
      "3P": matchers.isThirdPerson(tags)
    },
    tense: {

    },
    mood: {

    }
  }

  var results = {}

  if(lookup[wordClass]) {
    lookup[wordClass].forEach(prop => results[prop] = tags[prop])
  }

  return results
}
