import _ from 'lodash'
import {parse, toString} from '../grammar/parser'
import {findVerbs} from '../controllers/declensions'
import lookupVerb from '../models/static'

const supportedClasses = ['hk', 'kk', 'kvk', 'to', 'pfn']

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
  'við': ['ÞF', 'ÞGF'],
  'yfir': ['ÞF', 'ÞGF'],
}

function getCombinations(queries, words) {
  return _(queries).map(query => words.map(word => [query, word])).flatten().value()
}

function fixGrammar({modifier, cases}, word) {
  if (!Array.isArray(cases)) {
    cases = [cases]
  }

  let parsed = parse(word.wordClass, word.grammarTag)

  let res = {}

  res.wordClass = word.wordClass
  res.grammarTag = {}

  cases.forEach(grammarCase => {
    parsed.grammarCase = grammarCase
    res.grammarTag[grammarCase] = toString(word.wordClass, parsed)
  })

  return res
}

export default async function(query, words) {
  let queries = []

  if (prepositions[query]) {
    queries.push({modifier: query, cases: prepositions[query]})
  }

  let verbs = await findVerbs(query);
  let verbCases = await* verbs.map(lookupVerb)
  queries.push(... _.zip(verbs, verbCases).filter(([, cases]) => cases).map(([verb, cases]) => {
    return {modifier: verb, cases: cases}
  }))

  words = words.filter(word => supportedClasses.includes(word.wordClass))

  const combinations = getCombinations(queries, words)

  return combinations.map(combination => fixGrammar(...combination))
}
