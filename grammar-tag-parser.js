var lookup = require('./translate.json');
var mapTags = require('./mapTags');

export default (word, language) => {
  if(!lookup[language]) {
    return word.grammar_tag;
  }

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

  var grammarTags = tags.map(tag => lookup[language].grammar_tag[tag] || tag);

  return mapTags(word.grammar_tag, word.word_class);
}
