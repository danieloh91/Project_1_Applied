var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./models');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(__dirname + '/public'));

app.use('/vendor', express.static(__dirname + '/bower_components'));

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
