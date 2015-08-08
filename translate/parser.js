const parser = {
  case(tag) {
    return ['NF', 'ÞF', 'EF', 'ÞG'].filter(case => tag.includes(case))[0]
  }

  gender(tag) {
    return ['KK', 'KVK', 'HK'].filter(gender => tag.includes(gender))[0]
  }

  number(tag) {
    return ['ET', 'FT'].filter(number => tag.includes(number))[0]
  }

  article(tag) {
    if (tag.endsWith('gr')) {
      return 'gr'
    } else {
      return ''
    }
  }
}

export function toString(tagMap) {
  return tagMap.entries().join('')
}

export function parse(grammarTag) {
  var result = new Map()

  ['case', 'number', 'article'].forEach(x => {
    result.set(x, parser[x].call(grammarTag))
  })

  return result
}
