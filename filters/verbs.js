const filters = {
  'ég': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-1P-ET'
      ],
      'past': [
        'GM-FH-ÞT-1P-ET'
      ]
    }
  },
  'þú': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-2P-ET'
      ],
      'past': [
        'GM-FH-ÞT-2P-ET'
      ]
    }
  },
  'hann': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-3P-ET'
      ],
      'past': [
        'GM-FH-ÞT-3P-ET'
      ]
    }
  },
  'hún': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-3P-ET'
      ],
      'past': [
        'GM-FH-ÞT-3P-ET'
      ]
    }
  },
  'það': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-3P-ET'
      ],
      'past': [
        'GM-FH-ÞT-3P-ET'
      ]
    }
  },
  'við': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-1P-FT'
      ],
      'past': [
        'GM-FH-ÞT-1P-FT'
      ]
    }
  },
  'þið': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-2P-FT'
      ],
      'past': [
        'GM-FH-ÞT-2P-FT'
      ]
    }
  },
  'þeir': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-3P-FT'
      ],
      'past': [
        'GM-FH-ÞT-3P-FT'
      ]
    }
  },
  'þær': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-3P-FT'
      ],
      'past': [
        'GM-FH-ÞT-3P-FT'
      ]
    }
  },
  'þau': {
    wordClass: ['so'],
    grammarTag: {
      'present': [
        'GM-FH-NT-3P-FT'
      ],
      'past': [
        'GM-FH-ÞT-3P-FT'
      ]
    }
  },
}

let getFilters = query => {
  return filters[query]
}

export default getFilters;
