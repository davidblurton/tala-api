import _ from 'lodash'
import {parse} from '../grammar/parser'
import lookup from '../translate/translate.json'

function sort(result) {
  return _.sortBy(result.forms, x => {
    let rank = {
      nominative: 1,
      accusative: 2,
      dative: 3,
      genitive: 4,
    }
    return rank[x.tags && x.tags.grammarCase]
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
    try {
      let tags = parse(result.wordClass, form.grammarTag)
      form.tags = lang ? translateTags(tags, lang) : tags
    } catch (e) {
      console.log(e)
      form.tags = {}
    }
  })

  result.forms = sort(result)
  result.wordClass = lang ? translateWordClass(result.wordClass, lang) : result.wordClass
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
  let taggedResults = formattedResults.map(result => translate(result, lang))
  return taggedResults
}

