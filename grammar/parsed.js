import traverse from 'traverse'

function parseJson(s) {
  if (s.indexOf('"{*SUBJ"') !== s.lastIndexOf('"{*SUBJ"')) {
    let pos = s.lastIndexOf('"{*SUBJ"') + 7
    s = s.substring(0, pos) + '2' + s.substring(pos)
  }

  try {
    return JSON.parse(s)
  } catch(e) {
    console.log('Failed to parse', s)
    return JSON.parse(s)
  }
}

function formatWords(words) {
  return {
    word: Object.keys(words)[0],
    tag: Object.values(words)[0],
  }
}

function getWord(part) {
  if (!part) return null

  let result

  traverse(part).forEach(function(value) {
    if(this.key === 'WORDS') {
      result = value[0]
    }
  })

  return formatWords(result)
}

function getWords(part) {
  if (!part) return null

  let results = []

  traverse(part).forEach(function(value) {
    if(this.key === 'WORDS') {
      results.push(value)
    }
  })

  return results.map(word => formatWords(word[0]))
}

let structure = function(jsonString) {
  let parsed = parseJson(jsonString)

  let sentence = parsed['Parsed Text']['Sentence']
  let subject = getWord(sentence['{*SUBJ>'] || sentence['{*SUBJ'])
  let verb = getWord(sentence['[VPi'] || sentence['[VP'] || sentence['[VPb'] || sentence['[VP?Vn?'])
  let object = getWord(sentence['{*OBJ<'] || sentence['{*SUBJ2'] || sentence['[AP'])

  let prepositionPhrase = getWords(sentence['[PP'] || sentence['[PP?Pca?'] || sentence['[AdvP'])

  let preposition = prepositionPhrase && prepositionPhrase[0]
  let prepositionObject = prepositionPhrase && prepositionPhrase[1] || getWord(sentence['{*SUBJ'])

  return {subject, verb, object, preposition, prepositionObject}
}

let headwordFromTagged = function(tokenized, tagged, word) {
  let index = tokenized.indexOf(word)
  let headwordMatch = /\((.*)\)/.exec(tagged[index])
  return headwordMatch && headwordMatch[1]
}

export default {structure, headwordFromTagged}
