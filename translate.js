var lookup = require('./translate.json');

module.exports = function(language, word) {
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
  if(word.word_class === 'fn') {
    tags = word.grammar_tag.split('_');
  }

  // Nouns aren't tagged with gender
  if(lookup[language].grammar_tag[word.word_class.toUpperCase()]) {
    tags.push(word.word_class.toUpperCase());
  }

  var grammarTags = tags.map(function(tag) {
    return lookup[language].grammar_tag[tag] || tag;
  }).join(', ');

  if(wordClass) {
    word.word_class = wordClass;
  }

  if(grammarTags) {
    word.grammar_tag = grammarTags;
  }

  return word;
}
