var database = require('./database');
var translate = require('./translate');
var printer = require('./printer');
var argv = require('minimist')(process.argv.slice(2));

var words = argv._;

database.phrase(words, function(err, documents) {
  if(err) console.log(err);

  if(documents.length) {
    documents.forEach(function(word) {
      printer.print(translate('en', word).toObject());
    });
  } else {
    console.log('not found');
  }

  database.close();
});
