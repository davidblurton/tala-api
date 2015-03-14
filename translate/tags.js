let isNoun = wordClass =>
  wordClass === 'kk' ||
  wordClass === 'kvk' ||
  wordClass === 'hk';

module.exports = {
  isSingular: (tags) => tags.includes('ET'),

  isPlural: (tags) => tags.includes('FT'),

  isIndefinite: (tags, wordClass) => (isNoun(wordClass) && !tags.includes('gr')) || tags.includes('SB'),

  isDefinite: (tags) => tags.includes('gr') || tags.includes('VB'),

  isMasculine: (tags) => tags.includes('KK'),

  isFeminine: (tags) => tags.includes('KVK'),

  isNeuter: (tags) => tags.includes('HK'),

  isNominative: (tags) => tags.includes('NF'),

  isAccusative: (tags) => tags.includes('ÞF'),

  isGenitive: (tags) => tags.includes('EF'),

  isDative: (tags) => tags.includes('ÞG'),

  isFirstPerson: (tags) => tags.includes('1p') || tags.includes('1P'),

  isSecondPerson: (tags) => tags.includes('2p') || tags.includes('2P'),

  isThirdPerson: (tags) => tags.includes('3p') || tags.includes('3P')
}
