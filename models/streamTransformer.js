import stream from 'stream'

export default mapper => {
  let row = new stream.Transform({
    objectMode: true
  })

  row._transform = function(chunk, encoding, done) {
    this.push(mapper(chunk))
    done()
  }

  return row
}
