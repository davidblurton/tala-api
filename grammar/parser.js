export const supportClasses = ['hk', 'kk', 'kvk', 'to']

const featuresMap = {
  'hk': ['grammarCase', 'number', 'article'],
  'kk': ['grammarCase', 'number', 'article'],
  'kvk': ['grammarCase', 'number', 'article'],
  'to': ['gender', 'grammarCase', 'number'],
}

const parser = {
  grammarCase(tag) {
    return ['NF', 'ÞF', 'ÞGF', 'EF'].filter(x => tag.includes(x))[0]
  },

  gender(tag) {
    return ['KK', 'KVK', 'HK'].filter(x => tag.includes(x))[0]
  },

  number(tag) {
    return ['ET', 'FT'].filter(x => tag.includes(x))[0]
  },

  article(tag) {
    if (tag.endsWith('gr')) {
      return 'gr'
    } else {
      return ''
    }
  }
}

function isNoun(wordClass) {
  return ['hk', 'kk', 'kvk'].includes(wordClass)
}

export function toString(wordClass, tags) {
  if (isNoun(wordClass)) {
    let {grammarCase, number, article} = tags
    return `${grammarCase}${number}${article}`
  }

  if (wordClass === 'to') {
    let {gender, grammarCase, number} = tags
    return `${gender}_${grammarCase}${number}`
  }
}

export function parse(wordClass, grammarTag) {
  let features = featuresMap[wordClass]

  if (!features) {
    throw new Error(`Unsupported word class. Supported word classes: ${Object.keys(featureMap).join()}`)
  }

  var result = {}

  features.forEach(x => {
    result[x] = parser[x].call(null, grammarTag)
  })

  return result
}
