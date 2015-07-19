import express from 'express'
import cors from 'cors'
import responseTime from 'response-time'

import declensions from './routes/declensions'
import summary from './routes/summary'
import index from './routes/index'

let app = express()

app.use(cors())
app.use(responseTime())

app.use('/', declensions)
app.use('/', summary)
app.use('/', index)

let server = app.listen(8000, () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`app running at http://${host}:${port}`)
})
