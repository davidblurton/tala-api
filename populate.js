var fs = require('fs');
var parse = require('csv-parse');

var level = require('level');
var db = level(__dirname + '/db');

var output = [];
var parser = parse({
  delimiter: ';',
  trim: true
});

parser.on('data', function(data) {
  var key = data[4] + ';' + data[1];
  var value = data.join(';');
  db.put(key, value);
});

parser.on('error', function(err) {
  console.dir(err);
});

var input = fs.createReadStream(__dirname + '/SHsnid.csv', {
  encoding: 'utf8'
});

input.on('close', function() {
  console.log('done');
});

input.pipe(parser);
