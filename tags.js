if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

module.exports = {
  isSingular: function(tags) {
    return tags.includes('ET');
  },
  isPlural: function(tags) {
    return tags.includes('FT');
  },
  isIndefinite: function(tags) {
    return !tags.includes('gr');
  },
  isDefinite: function(tags) {
    return tags.includes('gr');
  },
  isMasculine: function(tags, wordClass) {
    return tags.includes('KK') || wordClass === 'kk';
  },
  isFeminine: function(tags, wordClass) {
    return tags.includes('KVK') || wordClass === 'kvk';
  },
  isNeuter: function(tags, wordClass) {
    return tags.includes('HK') || wordClass === 'hk';
  },
  isNominative: function(tags) {
    return tags.includes('NF');
  },
  isAccusative: function(tags) {
    return tags.includes('ÞF');
  },
  isGenitive: function(tags) {
    return tags.includes('EF');
  },
  isDative: function(tags) {
    return tags.includes('ÞG');
  },
}
