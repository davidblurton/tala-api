import database from '../models/database'

const replacementMap = {
  'a': 'á',
  'e': 'é',
  'i': 'í',
  'o': 'ó', // ö
  'u': 'ú',
  'ae': 'æ',
  'th': 'þ',
  'd': 'ð',
}

export function generateSuggestions(word) {
  const replacableLetters = Object.keys(replacementMap).filter(replacement => word.includes(replacement))
  let wordWithReplacements = replacableLetters.map(r => word.replace(r, replacementMap[r]))
  return wordWithReplacements
}

export function filterSuggestions(suggestions) {
  return Promise.all(suggestions.map(suggestion => database.lookup(suggestion)))
    .then(results => {
      return results.map(x => x[0]).filter(x => x).map(x => x.form)
    })
}
