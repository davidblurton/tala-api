var series = require('run-series');
var populate = require('./populate');
var simplePopulate = require('./simple-populate');
var createIndex = require('./create-index');

var words = require('./database').words;

function wordMapper(split) {
  var headWord = split[0];
  var binId = split[1];
  var wordClass = split[2];
  var section = split[3];
  var form = split[4];
  var grammarTag = split[5];

  return {
    headWord,
    binId: parseInt(binId, 10),
    wordClass,
    section,
    form,
    grammarTag,
  }
}

function lemmaMapper(line) {
  return wordMapper(line.split(';'));
}

function getForm(data) {
  var forms = data.value.forms ? data.value.forms.map(x => x.form) : [data.value.headWord]
  return forms.map(form => form.toLowerCase())
}

function uninflectableMapper(line) {
  var split = line.split(' ')
  var form = split[0]
  var wordClasses = split.slice(1)

  return wordClasses.map(wordClass => ({
    headWord: form,
    binId: form + '~' + wordClass,
    wordClass: wordClass,
    section: 'obeyg'
  }))
}

series([
  (cb) => simplePopulate('data/obeyg.smaord.txt', uninflectableMapper, cb),
  (cb) => populate('data/spurnarmyndir.csv', lemmaMapper, cb),
  (cb) => populate('data/plastur.csv', lemmaMapper, cb),
  (cb) => populate('data/SHsnid.csv', lemmaMapper, cb),
  (cb) => createIndex(words, 'form', getForm, cb)
], function(err, results) {
  if (err) console.log(err)
})
