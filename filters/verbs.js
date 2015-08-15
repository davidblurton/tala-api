const filters = {
  'ég': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-1P-ET',
      'ÞT': 'GM-FH-ÞT-1P-ET',
    }
  },
  'þú': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-2P-ET',
      'ÞT': 'GM-FH-ÞT-2P-ET',
    }
  },
  'hann': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-3P-ET',
      'ÞT': 'GM-FH-ÞT-3P-ET',
    }
  },
  'hún': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-3P-ET',
      'ÞT': 'GM-FH-ÞT-3P-ET'
    }
  },
  'það': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-3P-ET',
      'ÞT': 'GM-FH-ÞT-3P-ET'
    }
  },
  'við': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-1P-FT',
      'ÞT': 'GM-FH-ÞT-1P-FT'

    }
  },
  'þið': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-2P-FT',
      'ÞT': 'GM-FH-ÞT-2P-FT'
    }
  },
  'þeir': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-3P-FT',
      'ÞT': 'GM-FH-ÞT-3P-FT'
    }
  },
  'þær': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-3P-FT',
      'ÞT': 'GM-FH-ÞT-3P-FT'
    }
  },
  'þau': {
    wordClass: 'so',
    grammarTag: {
      'NT': 'GM-FH-NT-3P-FT',
      'ÞT': 'GM-FH-ÞT-3P-FT'
    }
  },
}

let getFilters = query => {
  return filters[query]
}

export default getFilters;
