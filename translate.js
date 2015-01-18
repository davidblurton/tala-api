var lookup = require('./translate.json');
var mapTags = require('./mapTags');

module.exports = function(word, language) {
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  if(!lookup[language]) {
    return word;
  }

  var wordClass = lookup[language].word_class[word.word_class];

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

  var grammarTags = tags.map(function(tag) {
    return lookup[language].grammar_tag[tag] || tag;
  });

  if(wordClass) {
    word.type = wordClass;
  }

  if(grammarTags) {
    word.tags = grammarTags;
  }

  word.info = mapTags(word.grammar_tag, word.word_class);

  return word;
}
