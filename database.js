var level = require('level');
var db = level(process.cwd() + '/db');

module.exports = {
  search: function(prefix) {
    return db.createKeyStream({
      gte: prefix,
      lt: prefix + '\xff'
    });
  },
  find: function(word) {
    return db.createKeyStream({
      gte: word + '~',
      lt: word + '~' + '\xff'
    });
  }
}
