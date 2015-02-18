let convert = (row, raw) => {
  return {
    _id: raw,
    _url: `/api/${raw}/id`,
    head_word: row[0],
    bil_id: row[1],
    word_class: row[2],
    section: row[3],
    word_form: row[4],
    grammar_tag: row[5]
  }
}

module.exports = function(data) {
  var word = data.split('~')[1];
  var row = word.split(';');
  return convert(row, data);
}
