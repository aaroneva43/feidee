var express = require('express');
var feidee = require('./feidee');


var app = express() 

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/all', function (req, res) {
  // res.send(feidee.getItems());
  feidee.info({}, function (text) {

	  res.send(text)
  });
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
