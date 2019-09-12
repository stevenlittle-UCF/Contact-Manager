var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var index = require('./routes/index');
var app = express();

// this is part of sessions
// https://stackoverflow.com/questions/25590969/node-js-expressjs-create-session
var session = require('express-session');
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
// todo sessions
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);


//app.get('/', function (req, res) {})  this will communicate with Dynamo Todo:Josh

//app.post('/', function (req, res) {}  

module.exports = app;

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
