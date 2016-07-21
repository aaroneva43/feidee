var express = require('express');
var feidee = require('./feidee');
var Promise = require('bluebird');

var app = express();



app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/all', function (req, res) {
	
	feidee.all().then(function (body) {
		res.send(body);
	});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
