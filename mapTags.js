var matchers = require('./tags');

module.exports = function(tags, wordClass) {
  return {
    masculine: matchers.isMasculine(tags, wordClass),
    feminine: matchers.isFeminine(tags, wordClass),
    neuter: matchers.isNeuter(tags, wordClass),
    singular: matchers.isSingular(tags),
    plural: matchers.isPlural(tags),
    definite: matchers.isDefinite(tags),
    indefinite: matchers.isIndefinite(tags, wordClass),
    nominitive: matchers.isNominative(tags),
    accusative: matchers.isAccusative(tags),
    genitive: matchers.isGenitive(tags),
    dative: matchers.isDative(tags)
  }
}
