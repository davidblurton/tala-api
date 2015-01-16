var fs = require('fs');
var parse = require('csv-parse');

var database = require('./database');
var convert = require('./convert');

var output = [];
var parser = parse({
  delimiter: ';',
  trim: true
});

parser.on('data', function(data) {
  var word = convert(data);
  word.save();
});

parser.on('error', function(err) {
  console.dir('parse error', err);
});

var input = fs.createReadStream(__dirname + '/SHsnid.csv', {
  encoding: 'utf8'
});

input.on('close', function() {
  database.addWords(output, function(err, documents) {
    if(err) {
      console.dir(err);
    } else {
      console.log('success');
    }

    console.log(documents.length + ' words inserted');

    process.exit(0);
  });
});

input.pipe(parser);
