var express = require('express')
var api = require('./routes/api')
var index = require('./routes/index')
var cors = require('cors')
var responseTime = require('response-time')

var app = express()
app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')

app.use(cors())
app.use(responseTime())

app.use('/api', api)
app.use('/', index)
app.use(express.static(__dirname + '/app'))

var server = app.listen(8000, () => {
  var host = server.address().address
  var port = server.address().port

  console.log('app running at http://%s:%s', host, port)
})
