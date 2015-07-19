import concat from 'concat-stream'

export default stream => new Promise((resolve, reject) => {
  stream.on('error', reject)
  stream.pipe(concat({
    encoding: 'object'
  }, resolve))
})
