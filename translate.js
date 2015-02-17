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

  if(grammarTags) {
    word.tags = parseGrammarTags(word, language);
  }

  var tags = mapTags(word.grammar_tag, word.word_class);

  word.info = Object.keys(tags).filter(key => tags[key]);

  return word;
}
