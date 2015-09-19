import _ from 'lodash'

function uniqueWords(words) {
  return _.uniq(words, w => w.binId)
}

function getDirectedCase(results) {
  let caseTags = results.map(r => Object.keys(r))

  let cases = {
    'NF': 'nominative',
    'ÞF': 'accusative',
    'ÞGF': 'dative',
    'EF': 'genitive',
  }

  return caseTags.map(caseTag => cases[caseTag]).join(' or ')
}

export default {uniqueWords, getDirectedCase}
