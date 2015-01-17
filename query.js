var level = require('level');
var db = level(__dirname + '/db');

var query = process.argv[2];
var i = 0;

db.createKeyStream({
  gte: query,
  lt: query + '\xff'
})
  .on('data', function(entry) {
    console.log(entry.split(';')[0])
    i++;
  })
  .on('end', function() {
    console.log(i + ' results');
  });
