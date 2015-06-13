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

export default function getFilters(input) {
  let parsed = input.split(' ')
  let result = {}

  const keyword = parsed[0]
  const word = parsed[1] || parsed[0]

  result.word = word
  result.keyword = keyword
  result.filters = {}

  if (Object.keys(prepositions).includes(keyword)) {
    result.filters = prepositions[keyword];
  }

  return result
}
