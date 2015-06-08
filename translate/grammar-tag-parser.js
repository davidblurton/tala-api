import lookup from './translate.json'

let endsWith = (str, suffix) =>
  str.indexOf(suffix, str.length - suffix.length) !== -1;

export default (word, language) => {
  var tags = word.grammarTag.split('-');

  // Definite article doesn't have a separator
  if (endsWith(word.grammarTag, 'gr')) {
    tags = [];
    tags.push(word.grammarTag.replace('gr', ''));
    tags.push('gr');
  }

  // Other pronouns use _ as a separator
  if (word.wordClass === 'fn' || word.wordClass === 'ao') {
    tags = word.grammarTag.split('_');
  }

  if (language) {
    return tags.map(tag => lookup[language].grammarTag[tag] || tag);
  } else {
    return tags;
  }
}
