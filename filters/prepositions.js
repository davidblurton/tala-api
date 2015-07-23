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
  'á': ['ÞF', 'ÞGF'],
  'eftir': ['ÞF', 'ÞGF'],
  'fyrir': ['ÞF', 'ÞGF'],
  'í': ['ÞF', 'ÞGF'],
  'með': ['ÞF', 'ÞGF'],
  'undir': ['ÞF', 'ÞGF'],
  // 'við': ['ÞF', 'ÞGF'],
  'yfir': ['ÞF', 'ÞGF'],
}

let getFilters = query => {
  let grammarCase = prepositions[query]

  if (grammarCase) {
    if (!Array.isArray(grammarCase)) {
      grammarCase = [grammarCase]
    }

    return grammarCase.map(gc => filters[gc])
  }
}

export default getFilters
