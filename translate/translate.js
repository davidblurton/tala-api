var lookup = require('./translate.json');
var mapTags = require('./mapTags');
var parseGrammarTags = require('./grammar-tag-parser');

export default (word, language) => {
  var tags = parseGrammarTags(word, language)

  word.tags = mapTags(word.grammarTag, word.wordClass)

  return word
}
