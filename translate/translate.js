var lookup = require('./translate.json');
var mapTags = require('./mapTags');
var parseGrammarTags = require('./grammar-tag-parser');

export default (word, language) => {
  if(!lookup[language]) {
    return word;
  }

  var wordClass = lookup[language].word_class[word.word_class];

  if(wordClass) {
    word.type = wordClass;
  }

  word.tags = parseGrammarTags(word, language);

  return word;
}
