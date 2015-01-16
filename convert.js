var Word = require('./models/word');

module.exports = function(row) {
  return new Word({
    head_word: row[0],
    bil_id: row[1],
    word_class: row[2],
    section: row[3],
    word_form: row[4],
    grammar_tag: row[5]
  });
}
