var express = require('express');
var app = express();
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade')

var api = require('./routes/api');

app.use('/api', api);

app.get('/', function (req, res) {
  res.render('index');
});

app.use(express.static(__dirname + '/app'));

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
