var dawg = require('udawg');

var Store = function() {
  this.store = dawg();
}

Store.prototype.insert = function(word) {
  this.store.insert(word);
};

Store.prototype.lookup = function(prefix) {
  var node = this.store.lookup(prefix, false);

  if (node) {
    this.store.values(node, prefix).map(function(word) {
      return word;
    });
  } else {
    return [];
  }
}

module.exports = Store;
