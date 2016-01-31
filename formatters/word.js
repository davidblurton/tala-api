import _ from 'lodash'
import {parse} from '../grammar/parser'
import lookup from '../translate/translate.json'

function sort(result) {
  return _.sortBy(result.forms, x => {
    let caseRank = {
      NF: 1,
      ÞF: 2,
      ÞGF: 3,
      EF: 4,
    }

    let personRank = {
      '1P': 1,
      '2P': 2,
      '3P': 3,
    }

    return caseRank[x.tags && x.tags.grammarCase] ||
        personRank[x.tags && x.tags.person]
  })
}

function translateTags(tags, language) {
  return _.mapValues(tags, tag => lookup[language].grammarTag[tag] || tag)
}

function translateWordClass(wordClass, language) {
  return lookup[language].wordClass[wordClass]
}

function translate(result, lang) {
  result.forms.forEach(form => {
    form.tags = lang ? translateTags(form.tags, lang) : form.tags
  })

  result.wordClass = lang ? translateWordClass(result.wordClass, lang) : result.wordClass
  return result
}

function tag(result) {
  result.forms.forEach(form => {
    try {
      form.tags = parse(result.wordClass, form.grammarTag)
    } catch (e) {
      console.log(e)
      form.tags = {}
    }
  })

  result.forms = sort(result)
  return result
}

function formatResults(forms) {
  let first = forms[0]

  let {headWord, binId, wordClass, section} = first

  return {
    headWord,
    binId,
    wordClass,
    section,
    forms: forms.map(({form, grammarTag}) => ({form, grammarTag})),
  }
}

export default function(results, lang) {
  let resultsById = _.groupBy(results, 'binId')
  let uniqueHeadWords = _.values(resultsById)
  let formattedResults = uniqueHeadWords.map(formatResults)
  return formattedResults
      .map(result => tag(result))
      .map(result => translate(result, lang))
}

