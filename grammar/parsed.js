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

function getWords(part) {
  if (!part) return null

  let result

  traverse(part).forEach(function(value) {
    if(this.key === 'WORDS') {
      result = value[0]
    }
  })

  return formatWords(result)
}

let structure = function(jsonString) {
  let parsed = parseJson(jsonString)

  let sentence = parsed['Parsed Text']['Sentence']
  let subject = getWords(sentence['{*SUBJ'] || sentence['{*SUBJ>'])
  let verb = getWords(sentence['[VPi'] || sentence['[VP'])
  let object = getWords(sentence['{*OBJ<'] || sentence['{*SUBJ2'] || sentence['[AP'])

  return {subject, verb, object}
}

let headwordFromPart = function(part) {
  let headwordMatch = headwordRegex.exec(part)
  return headwordMatch && headwordMatch[1]
}

export default {structure, headwordFromPart}
