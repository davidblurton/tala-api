var matchers = require('./tags');

var lookup = {
  'kk': ['case', 'number', 'article'],
  'kvk': ['case', 'number', 'article'],
  'hk': ['case', 'number', 'article']
}

export default (tags, wordClass) => {
  var tags = {
    case: {
      NF: matchers.isNominative(tags),
      ÞF: matchers.isAccusative(tags),
      EF: matchers.isGenitive(tags),
      ÞGF: matchers.isDative(tags)
    },
    number: {
      ET: matchers.isSingular(tags),
      FT: matchers.isPlural(tags)
    },
    article: {
      'gr': matchers.isDefinite(tags),
      '': matchers.isIndefinite(tags, wordClass)
    },
    gender: {
      masculine: matchers.isMasculine(tags, wordClass),
      feminine: matchers.isFeminine(tags, wordClass),
      neuter: matchers.isNeuter(tags, wordClass)
    },
    person: {
      "first person": matchers.isFirstPerson(tags),
      "second person": matchers.isSecondPerson(tags),
      "third person": matchers.isThirdPerson(tags)
    },
    tense: {

    }
  }

  if(lookup[wordClass]) {
    var results = {}
    lookup[wordClass].forEach(prop => results[prop] = tags[prop])
    return results
  }

  return tags;
}
