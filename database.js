var mongoose = require('mongoose');
var Word = require('./models/word');

var Database = function() {
  mongoose.connect('mongodb://localhost/bil');

  return {
    addWords: function(words, callback) {
      Word.collection.insert(words, callback);
    },
    startsWith: function(prefix, callback) {
      var re = new RegExp('^' + prefix + '.*');
      Word.find()
        .regex('word_form', re)
        .exec(callback);
    },
    phrase: function(words, callback) {
      Word.find({
        'word_form': { $in: words }
      }).exec(callback);
    },
    close: function() {
      mongoose.disconnect();
    }
  }
}

module.exports = Database();
