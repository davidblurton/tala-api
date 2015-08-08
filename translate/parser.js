const features = ['grammarCase', 'number', 'article']

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

export function toString(tags) {
  return features.map(feature => tags[feature]).join('')
}

export function parse(grammarTag) {
  var result = {}

  features.forEach(x => {
    result[x] = parser[x].call(null, grammarTag)
  })

  return result
}
