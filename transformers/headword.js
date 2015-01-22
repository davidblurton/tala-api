module.exports = function(data) {
  var headword = data.split('~')[0];
  return headword;
}
