var express = require('express');
var router = express.Router();
var fs = require('fs');


// var API = require('../models/Main');

//var contacts - ;

router.get('/', function (req, res, next) { //root dir route

  res.render('index', 
  { 
    title: 'Sample',
  }
  );
});

router.post('/', function(req, res)
{
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
  res.render('register', {
    title: 'AWS RESULT',
  });

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
