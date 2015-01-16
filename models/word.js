var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
  head_word: String,
  bil_id: { type: Number, index: true },
  word_class: String,
  section: String,
  word_form: { type: String, index: true },
  grammar_tag: String
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;
