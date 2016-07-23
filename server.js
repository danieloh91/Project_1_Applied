var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./models'),
    controllers = require('./controllers');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(__dirname + '/public'));

app.use('/vendor', express.static(__dirname + '/bower_components'));

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// JSON API endpoints
app.get('/api', controllers.api.index);

app.get('/api/positions', controllers.positions.index);

app.get('/api/positions/:positionId', controllers.positions.show);

app.post('/api/positions', controllers.positions.create);

app.delete('/api/positions/:positionId', controllers.positions.destroy);

app.put('/api/positions/:positionId', controllers.positions.update);

app.get('/api/companies', controllers.positionsCompanies.index);

app.get('/api/companies/:companyId', controllers.positionsCompanies.show);

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
