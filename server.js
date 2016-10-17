var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./models'),
    controllers = require('./controllers'),
    mongoose = require('mongoose'),

    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(__dirname + '/public'));

app.use('/vendor', express.static(__dirname + '/bower_components'));


// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.put('/api/companies/:companyId', controllers.positionsCompanies.update);

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
