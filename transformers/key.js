var stream = require('stream')

module.exports = function() {
  var liner = new stream.Transform({
    objectMode: true
  })

  liner._transform = function(chunk, encoding, done) {
    var data = chunk.split(';')[0];
    this.push(data);
    done()
  }

  return liner;
}
