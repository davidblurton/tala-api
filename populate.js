var fs = require('fs');
var parse = require('csv-parse');

var level = require('level');
var db = level(__dirname + '/db');

var output = [];
var count = 0;
var parser = parse({
  delimiter: ';',
  trim: true
});

parser.on('data', function(data) {
  var key = [data[4], data[1], data[5]].join(';');
  var value = data.join(';');
  db.put(key, value);

  count++;
});

parser.on('error', function(err) {
  console.dir(err);
});

var input = fs.createReadStream(__dirname + '/plastur.csv', {
  encoding: 'utf8'
});

input.on('close', function() {
  console.log(count + ' records inserted')
  console.log('done');
});

input.pipe(parser);
