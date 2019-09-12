var express = require('express');
var router = express.Router();
var fs = require('fs');
var session = require('express-session');
var app = express();

app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));

var sess;


// var API = require('../models/Main');

//var contacts - ;

router.get('/', function (req, res, next) { //root dir route

  sess=req.session;
  sess.uid="test";

  if (sess.uid)
  {
    res.redirect('/register');
  }
  else
  {
    res.render('index', 
    { 
      title: 'Sample',
    });
  }
});

router.post('/', function(req, res)
{
  sess=req.session;
  console.log(req.body);
  // var parsedJSON = JSON.parse(req.body);
  var request = req.body.logic;
  switch(request)
  {
    case 'signup':
      console.log("in my logic");
      var output = signupLogin();
      res.send(output);
      break;
    case 'login':
      sess.uid = req.body.uid;
      console.log("redirect");
      res.redirect('/register');
      break;
  }

});

var signupLogin = function()
{
  // verify the info provided
  // perform needed logic
};

var thisisafunction = function()
{
  console.log("I am in my function!");
};

router.get('/register', function(req, res, next) {
  sess=req.session;

  if (sess.email)
  {
    document.getElementById("test").innerHTML = "You are not logged int";
    res.render('register', 
    { 
      title: 'Sample',
    });
  }
  else
  {
    // document.getElementById("test").innerHTML = "You are not logged int";
    res.render('register', 
    { 
      title: 'Sample',
    });
  }

});

router.get('/add', function(req, res, next) {});


router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'AWS RESULT',
  });

});

router.get('/contacts', function(req, res, next) {
  //get contacts from aws api.. 
  var contacts_json = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'));  //mimic what API returns
  res.render('contacts', {
    title: 'AWS RESULT',
    contacts: contacts_json
  });

});

//router.get('/remove/:id', function(req, res, next) {});

module.exports = router;
