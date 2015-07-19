export const verbFilter = {
  wordClass: ['so'],
  grammarTag: {
    'present': ['GM-FH-NT-1P-ET', 'GM-FH-NT-2P-ET', 'GM-FH-NT-3P-ET', 'GM-FH-NT-1P-FT', 'GM-FH-NT-2P-FT', 'GM-FH-NT-3P-FT'],
    'past': ['GM-FH-ÞT-1P-ET', 'GM-FH-ÞT-2P-ET', 'GM-FH-ÞT-3P-ET', 'GM-FH-ÞT-1P-FT', 'GM-FH-ÞT-2P-FT', 'GM-FH-ÞT-3P-FT'],
    'supine': ['MM-SAGNB']
  }
}

const prepositions = {
  'um': {
    wordClass: ['hk', 'kk', 'kvk', 'pfn'],
    grammarTag: ['ÞF'] // accusative
  },

  'frá': {
    wordClass: ['hk', 'kk', 'kvk', 'pfn'],
    grammarTag: ['ÞGF'] // dative
  },

  'til': {
    wordClass: ['hk', 'kk', 'kvk', 'pfn'],
    grammarTag: ['EF'] // genitive
  },
}

export function getFilters(preposition, word) {
  let result = {};

  result.word = word
  result.preposition = preposition
  result.filters = {}

  if (prepositions[preposition]) {
    result.filters = prepositions[preposition];
  }

  return result
}
