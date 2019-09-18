var express = require('express');
var router = express.Router();
var fs = require('fs');
var session = require('express-session');
var app = express();
var validator = require('validator');
var bcrypt = require('bcrypt');
var axios = require('axios');

app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));

var sess;

router.get('/', function (req, res, next)  //root dir route
{

  sess=req.session;

  res.render('index', 
  { 
    title: 'Sample',
  });
});

// This is the logout function
router.post('/logout', function(req, res)
{
  sess = req.session;

  sess.destroy();

  res.send("success");
});

// This is where the server side login script goes
router.post('/login', function(req, res)
{
  // get the session
  sess = req.session;

  // collect sent values
  var uName = req.body.uid;
  var pwd = req.body.pwd;

  // used to store hashed value
  var hashed;

  // send stuff to db
  axios.post('https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/login', 
  {
    "user_id": uName,
    "pwd" : pwd
  })
  .then(function (response) 
  {
    // this call will return the hash for the user
    hashed = response;
    
    // compare the hash to the pwd
    bcrypt.compare(pwd, hashed, function(err, res1) {
      if (res == true)
      {
        sess.uName = uid;
        res.send("success");
      }
      else
      {
        res.send("Bad pass");
      }
    })
  })
  .catch(function (error) 
  {
    console.log(error);
  });
});

// This is where server side register script goes
router.post('/register', function(req, res)
{
  // Collect sent info
  var uid = req.body.uid;
  var mail = req.body.mail;
  var pwd = req.body.pwd;
  var pwdr = req.body.pwdr;
  var first = req.body.first;
  var last = req.body.last;

  // check for blank fields
  if (validator.isEmpty(uid) || validator.isEmpty(mail) || validator.isEmpty(pwd) || validator.isEmpty(pwdr))
  {
    res.send("Blank fields");
  }
  // check if pwds match
  else if (pwd != pwdr)
  {
    res.send("pwd no match");
  }
  // validate email
  else if (!validator.isEmail(mail))
  {
    res.send("invalid email");
  }
  // validate user
  else if (!validator.isAlphanumeric(uid))
  {
    res.send("invalid user");
  }
  // check that the name provided is only alphabetic
  else if (!validator.isAlpha(first) || !validator.isAlpha(last))
  {
    res.send("Please enter a valid name");
  }
  // run commands
  else
  {
    var hashPwd;
    
    // run the hash function
    // note run the api call inside this to have it run
    // in the correct order
    bcrypt.hash(pwd, 10, function(err, hash)
    {
      hashPwd = hash;

      // send stuff to db
      axios.post('https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/users', 
      {
        "user_id": uid,
        "first": first,
        "last": last,
        "mail": mail,
        "pwd" : hashPwd
      })
      .then(function (response) 
      {
        if (response.data == "user added")
        {
          res.send("Sign up successful");
        }
        else if (response.data == "ERROR 1 DUPLICATE USER")
        {
          res.send("That user already exists!");
        }
        else
        {
          // console.log(response.data);
          res.send("Unhandled response");
        }
      })
      .catch(function (error) 
      {
        console.log(error);
      });
    });
  }
});

router.get('/register', function(req, res, next) {
  res.render('register',
  {
    title: 'Sample'
  });
});

// this method checks that a session exists
router.post('/amLogged', function(req, res)
{
  // get the session
  sess = req.session;

  // check if the session has a user defined
  if (sess.uName)
  {
    res.send(sess.uName);
  }
  else
  {
    res.send("ERROR #123");
  }
});

router.get('/add', function(req, res, next) {});

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
