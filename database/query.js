var words = require('./database').words;
var getBy = require('./get-by');

var query = process.argv[2]

getBy('form', query, function(err, result) {
  result.forEach(result => {
    words.get(result, console.log)
  })
})
