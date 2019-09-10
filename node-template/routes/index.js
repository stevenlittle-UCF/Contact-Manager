var express = require('express');
var router = express.Router();
var fs = require('fs');



//var contacts - ;

router.get('/', function (req, res, next) { //root dir route

  res.render('index', 
  { 
    title: 'Sample',
  }
  );
});
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
