var stream = require('stream')

function convert(row) {
  return {
    head_word: row[0],
    bil_id: row[1],
    word_class: row[2],
    section: row[3],
    word_form: row[4],
    grammar_tag: row[5]
  };
}

module.exports = function() {
  var liner = new stream.Transform({
    objectMode: true
  })

  liner._transform = function(chunk, encoding, done) {
    var data = chunk.split(';');
    this.push(convert(data));
    done()
  }

  return liner;
}
