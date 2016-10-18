var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
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

// require User model
var db = require('./models'),
    controllers = require('./controllers'),
    User = db.User;

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// AUTH ROUTES
// show signup view
app.get('/signup', function signuppage (req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.sendFile(__dirname + '/views/signup.html');
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  if (!req.user) {
    return res.redirect('/');
  }
  var new_user = new User({username: req.body.username});
  User.register(new_user, req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        console.log('successful signup');
        res.redirect('/');
      });
    }
  );
});

// show login view
app.get('/login', function (req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.sendFile(__dirname + '/views/login.html');
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/');
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});

//TODO: figure out how to sign up different users

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
