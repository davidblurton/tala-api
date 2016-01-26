import express from 'express'
import cors from 'cors'
import responseTime from 'response-time'
import logger from 'express-bunyan-logger'
import compression from 'compression'

import declensions from './routes/declensions'
import index from './routes/index'
import sentence from './routes/sentence'
//import error from './error'

let app = express()

app.use(logger({
  name: 'request',
  streams: [{
    level: 'debug',
    stream: process.stdout
  }],
  format: ':remote-address :incoming :method :url :status-code - :user-agent[family] :user-agent[major].:user-agent[minor] :user-agent[os] - :response-time ms',
  excludes: ['*']
}))
app.use(cors())
app.use(responseTime())
app.use(compression())

app.use('/', index)
app.use('/', declensions)
app.use('/', sentence)

app.use(logger.errorLogger())
//app.use(error)

let server = app.listen(8000, () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`app running at http://${host}:${port}`)
})
