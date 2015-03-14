var matchers = require('./tags');

export default (tags, wordClass) => {
  return {
    case: {
      nominitive: matchers.isNominative(tags),
      accusative: matchers.isAccusative(tags),
      genitive: matchers.isGenitive(tags),
      dative: matchers.isDative(tags)
    },
    number: {
      singular: matchers.isSingular(tags),
      plural: matchers.isPlural(tags)
    },
    article: {
      definite: matchers.isDefinite(tags),
      indefinite: matchers.isIndefinite(tags, wordClass)
    },
    gender: {
      masculine: matchers.isMasculine(tags),
      feminine: matchers.isFeminine(tags),
      neuter: matchers.isNeuter(tags)
    },
    person: {
      "first person": matchers.isFirstPerson(tags),
      "second person": matchers.isSecondPerson(tags),
      "third person": matchers.isThirdPerson(tags)
    },
    tense: {

    }
  }
}
