const subjectRegex = /{\*SUBJ[>]? \[(.*?) \] }/g
const firstNounRegex = /\[(NP[^\[]*) ]/
const verbRegex = /\[(VP[^\[]*) ]/
const objectRegex = /{\*OBJ<? \[(.*?) \] }/
const compRegex = /{\*COMP \[(.*?) \] }/
const apRegex = /\[(AP[^\[]*) ]/
const adverb = /\[(AdvP[^\[]*?) ]/

const headwordRegex = /\((\w.*)\)/

function matchAll(str, regex) {
    var res = [];
    var m;
    if (regex.global) {
        while (m = regex.exec(str)) {
            res.push(m[1]);
        }
    } else {
        if (m = regex.exec(str)) {
            res.push(m[1]);
        }
    }
    return res;
}

let structure = function(parsed) {
  let subjectMatches = matchAll(parsed, subjectRegex)

  let firstNounMatch = firstNounRegex.exec(parsed)

  let verbMatch = verbRegex.exec(parsed)
  let objectMatch = objectRegex.exec(parsed) || compRegex.exec(parsed)

  let subject = subjectMatches[0] || firstNounMatch && firstNounMatch[1]
  let verb = verbMatch && verbMatch[1]
  let object = objectMatch && objectMatch[1]

  // If the parsed doesn't identify an object, but idetifies 2 subjects, the second subject is probably the object
  if (!object && subjectMatches[1]) {
    object = subjectMatches[1]
  }

  if(!object) {
    let apMatch = apRegex.exec(parsed)
    object = apMatch && apMatch[1]
  }

  return {subject, verb, object}
}

let wordFromPart = function(part) {
  return part.split(' ')[1]
}

let headwordFromPart = function(part) {
  let headwordMatch = headwordRegex.exec(part)
  return headwordMatch && headwordMatch[1]
}

export default {structure, wordFromPart, headwordFromPart}
