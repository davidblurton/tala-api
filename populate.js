var fs = require('fs');
var parse = require('csv-parse');
var id = require('./generateId');

var level = require('level');
var db = level(__dirname + '/db');

var output = [];
var count = 0;
var parser = parse({
  delimiter: ';',
  trim: true
});

parser.on('data', function(data) {
  var bin_id = data[1];
  var word_form = data[4];
  var data = data.join(';');

  db.put(bin_id + '~' + data, 0);
  db.put(word_form + '~' + data, 0);

  count++;
});

parser.on('error', function(err) {
  console.dir(err);
});

var input = fs.createReadStream(__dirname + '/SHsnid.csv', {
  encoding: 'utf8'
});

input.on('close', function() {
  console.log(count + ' records inserted')
  console.log('done');
});

input.pipe(parser);
