var database = require('./database');
var translate = require('./translate');
var argv = require('minimist')(process.argv.slice(2));

var words = argv._;

database.phrase(words, function(err, documents) {
  if(err) console.log(err);

  if(documents.length) {
    documents.forEach(function(word) {
      console.log(translate('en', word));
    });
  } else {
    console.log('not found');
  }

  database.close();
});
