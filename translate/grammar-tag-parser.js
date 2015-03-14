var lookup = require('./translate.json');

let endsWith = (str, suffix) =>
  str.indexOf(suffix, str.length - suffix.length) !== -1;

export default (word, language) => {
  var tags = word.grammar_tag.split('-');

  // Definite article doesn't have a separator
  if(endsWith(word.grammar_tag, 'gr')) {
    tags = [];
    tags.push(word.grammar_tag.replace('gr', ''));
    tags.push('gr');
  }

  // Other pronouns use _ as a separator
  if(word.word_class === 'fn' || word.word_class === 'ao') {
    tags = word.grammar_tag.split('_');
  }

  if(language) {
    return tags.map(tag => lookup[language].grammar_tag[tag] || tag);
  } else {
    return tags;
  }
}
