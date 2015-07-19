import express from 'express'
import api from './routes/api'
import summary from './routes/summary'
import index from './routes/index'
import cors from 'cors'
import responseTime from 'response-time'

let app = express()

app.use(cors())
app.use(responseTime())

app.use('/', api)
app.use('/', summary)
app.use('/', index)
app.use(express.static(__dirname + '/app'))

let server = app.listen(8000, () => {
  let host = server.address().address
  let port = server.address().port

  console.log('app running at http://%s:%s', host, port)
})
