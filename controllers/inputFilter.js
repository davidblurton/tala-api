export default function getFilters(input) {
  let parsed = input.split(' ')
  let result = {}

  const keyword = parsed[0]
  const word = parsed[1] || parsed[0]

  result.word = word
  result.keyword = keyword
  result.filters = {}

  if (keyword === 'að') {
    result.filters = {
      wordClass: ['so'],
      grammarTag: ['MM-SAGNB']
    }
  }

  if (keyword === 'frá') {
    result.filters = {
      wordClass: ['hk', 'kk', 'kvk'],
      grammarTag: ['ÞGF']
    }
  }

  return result
}
