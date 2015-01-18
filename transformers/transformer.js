var stream = require('stream')

module.exports = function(mapper) {
  var liner = new stream.Transform({
    objectMode: true
  })

  liner._transform = function(chunk, encoding, done) {
    this.push(mapper(chunk));
    done()
  }

  return liner;
}
