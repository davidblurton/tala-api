var levelup = require('levelup');
var path = require('path');
var sublevel = require('level-sublevel');

var db = sublevel(levelup(path.join(__dirname, '../db'), {
  valueEncoding: 'json',
}))

module.exports = {
  index: db.sublevel('index'),
  words: db.sublevel('words'),
}
