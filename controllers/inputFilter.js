const prepositions = {
  'að': {
    wordClass: ['so'],
    //grammarTag: ['MM-SAGNB']
  },

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
  }
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
