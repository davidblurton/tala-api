const subjectRegex = /{\*SUBJ> \[(.*?) \] }/
const firstNounMatch = /\[(NP[^\[]*) ]/
const verbRegex = /\[(VP[^\[]*) ]/

let structure = function(parsed) {
  let subjectMatch = subjectRegex.exec(parsed) || firstNounMatch.exec(parsed)
  let verbMatch = verbRegex.exec(parsed)

  let subject = subjectMatch && subjectMatch[1]
  let verb = verbMatch && verbMatch[1]

  return {subject, verb}
}

let wordFromPart = function(part) {
  return part.split(' ')[1]
}

export default {structure, wordFromPart}
