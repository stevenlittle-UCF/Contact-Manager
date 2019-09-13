var express = require('express');
var router = express.Router();
var fs = require('fs');
var session = require('express-session');
var app = express();
var validator = require('validator');
var bcrypt = require('bcrypt');

app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));

var sess;

//var contacts - ;

router.get('/', function (req, res, next) { //root dir route

  sess=req.session;

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
  sess = req.session;

  var uName = req.body.uid;
  var pwd = req.body.pwd;

  // check if user exists

  // verify password against hash
  // use bcrypt

  // if we get to this point the session needs creating

  // this line would get the id for the user in the db
  // var uid = 

  sess.uName = uName;
  // sess.uid = uid;

  // route to the contacts page
  // note for now goes to register as i am testing
  // console.log(sess);
  res.send("success");
});

// This is where server side register script goes
router.post('/register', function(req, res)
{
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
    bcrypt.hash(pwd, 10, function(err, hash)
    {
      hashPwd = hash;
    });

    // send stuff to db
    var dbParams = JSON.stringify(
    {
      "user_id": uid,
      "first_name": first,
      "last_name": last,
      "email": mail,
      "password" : hashPwd,
      "image" : "path/to/image"
    });

    res.send("success");
  }
});

router.get('/register', function(req, res, next) {
  res.render('register',
  {
    title: 'Sample'
  });
});

router.post('/amLogged', function(req, res)
{
  // get the session
  sess = req.session;

  // check if the session has a user defined
  if (sess.uName)
  {
    res.send("true");
  }
  else
  {
    res.send("false");
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
