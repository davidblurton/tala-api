var lookup = require('./translate.json');
var mapTags = require('./mapTags');
var parseGrammarTags = require('./grammar-tag-parser');

export default (word, language) => {
  if(!lookup[language]) {
    return word
  }

  word[language] = {}

  var wordClass = lookup[language].word_class[word.word_class]

  if(wordClass) {
    word[language].word_class = wordClass;
  }

  var tags = parseGrammarTags(word, language)

  var grammar_tags = tags.map(tag => lookup[language].grammar_tag[tag] || tag)

  word[language].grammar_tag = grammar_tags
  word[language].tags = mapTags(tags, language)

  return word;
}
