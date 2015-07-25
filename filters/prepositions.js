const filters = {
  'ÞF': {
    wordClass: ['hk', 'kk', 'kvk', 'pfn'],
    grammarTag: {
      'singular': ['ÞFET', 'ÞFETgr'],
      'plural': ['ÞFFT', 'ÞFFTgr'],
    }
  },

  'ÞGF': {
    wordClass: ['hk', 'kk', 'kvk', 'pfn'],
    grammarTag: {
      'singular': ['ÞGFET', 'ÞGFETgr'],
      'plural': ['ÞGFFT', 'ÞGFFTgr'],
    }
  },

  'EF': {
    wordClass: ['hk', 'kk', 'kvk', 'pfn'],
    grammarTag: {
      'singular': ['EFET', 'EFETgr'],
      'plural': ['EFFT', 'EFFTgr'],
    }
  },

  'ÞFÞGF': {
    wordClass: ['hk', 'kk', 'kvk', 'pfn'],
    grammarTag: {
      'singular - accusative': ['ÞFET', 'ÞFETgr'],
      'plural - accusative': ['ÞFFT', 'ÞFFTgr'],
      'singular - dative': ['ÞGFET', 'ÞGFETgr'],
      'plural - dative': ['ÞGFFT', 'ÞGFFTgr']
    }
  },
}

const prepositions = {
  // Accusative
  'fyrir ofan': 'ÞF',
  'gegnum': 'ÞF',
  'kringum': 'ÞF',
  'um': 'ÞF',
  'umfram': 'ÞF',
  'umhverfis': 'ÞF',

  // Dative
  'að': 'ÞGF',
  'af': 'ÞGF',
  'andspænis': 'ÞGF',
  'ásamt': 'ÞGF',
  'frá': 'ÞGF',
  'gagn': 'ÞGF',
  'gagnvart': 'ÞGF',
  'gegnt': 'ÞGF',
  'handa': 'ÞGF',
  'hjá': 'ÞGF',
  'meðfram': 'ÞGF',
  'mót': 'ÞGF',
  'móti': 'ÞGF',
  'nálægt': 'ÞGF',
  'undan': 'ÞGF',
  'úr': 'ÞGF',

  // Genitive
  'án': 'EF',
  'auk': 'EF',
  'austan': 'EF',
  'innan': 'EF',
  'í staö': 'EF',
  'meðal': 'EF',
  'megin': 'EF',
  'milli': 'EF',
  'millum': 'EF',
  'neðan': 'EF',
  'norðan': 'EF',
  'ofan': 'EF',
  'sakir': 'EF',
  'sunnan': 'EF',
  'sökum': 'EF',
  'til': 'EF',
  'utan': 'EF',
  'vegna': 'EF',
  'vestan': 'EF',

  // Accusative or dative
  'á': 'ÞFÞGF',
  'eftir': 'ÞFÞGF',
  'fyrir': 'ÞFÞGF',
  'í': 'ÞFÞGF',
  'með': 'ÞFÞGF',
  'undir': 'ÞFÞGF',
  // 'við': ['ÞF', 'ÞGF'],
  'yfir': 'ÞFÞGF',
}

let getFilters = query => {
  let grammarCase = prepositions[query]

  if (grammarCase) {
    return filters[grammarCase]
  }
}

export default getFilters
