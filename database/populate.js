var fs = require('fs');
var LineByLineReader = require('line-by-line');
var words = require('./database').words;

var wordBuffer = [];
var batchBuffer = [];

var currentId;
var total = 286286;
var batchSize = 1000;
var count = 0;

function collect(words) {
  var first = words[0]

  return {
    headWord: first.headWord,
    binId: first.binId,
    wordClass: first.wordClass,
    section: first.section,
    forms: words.map(x => ({form: x.form, grammarTag: x.grammarTag}))
  }
}

function populate(path, mapper, cb) {
  var input = new LineByLineReader(path);

  input.on('line', function(data) {
    var word = mapper(data);

    if (!currentId) {
      currentId = word.binId
    }

    if (word.binId === currentId) {
      wordBuffer.push(word)
    } else {
      var entry = collect(wordBuffer);
      batchBuffer.push({
        type: 'put',
        key: entry.binId,
        value: entry
      })

      if (batchBuffer.length > batchSize) {
        input.pause();
        words.batch(batchBuffer, function(err) {
          if (err) cb(err)
          count += batchBuffer.length
          console.log(`${count}/${total} = ${Math.round(count/total*100)}%`)
          batchBuffer = [];
          input.resume();
        })
      }

      wordBuffer = [];
      wordBuffer.push(word);
      currentId = word.binId;
    }
  });

  input.on('error', function(err) {
    cb(err)
  });

  input.on('end', function() {
    var entry = collect(wordBuffer);
    batchBuffer.push({
      type: 'put',
      key: entry.binId,
      value: entry
    })

    words.batch(batchBuffer, function(err) {
      cb(err)
    })
  });
}

module.exports = populate;
