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
    hashed = response.data;
    // console.log(hashed);
    
    // compare the hash to the pwd
    bcrypt.compare(pwd, hashed, function(err, res1) {
      // console.log(res1);
      if (res1 == true)
      {
        sess.uName = uName;
        res.send("success");
	res.render('/contacts',{
    title: ' CONTACTs'
 		 })
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

// This returns a JSON object containing a list of the contacts
router.post('/getContacts', function(req, res) 
{
  sess = req.session;

  if (sess.uName)
  {
    axios.post('https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/lookup',
    {
      "user_id" : sess.uName
    })
    .then(function (response) // response contains the JSON object
    {
      //console.log(response);
      res.json(response.data);
    })
    .catch(function(error)
    {
      console.log(error);
    });
  }
  else
  {
    res.send("Error no session");
  }
});

router.get('/add', function(req, res)
{
  res.render('add',{
    title: 'ADD CONTACT'
  })

})

router.post('/addContact', function(req, res)
{
  sess = req.session;
  var first = req.body.first;
  var last = req.body.last;
  var mail = req.body.mail;
  var city = req.body.city;
  var state = req.body.state;
  var modify = req.body.modify;

  if (modify == "false" && validator.isEmpty(first) || validator.isEmpty(last) ||
      validator.isEmpty(mail) || validator.isEmpty(city) ||
      validator.isEmpty(state))
  {
    res.send("Empty fields");
  }

  axios.post('https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/contactadd',
  {
    "user_id" : sess.uName,
    "first_name" : first,
    "last_name" : last,
    "mail" : mail,
    "city" : city,
    "state" : state
  })
  .then(function (response)
  {
    console.log(response);
    if (response.data == "contact added")
    {
      res.send("success");
    }
    else
    {
      res.send("Failed to add contact :(");
    }
  })
  .catch(function (error)
  {
    console.log(error);
  })
})

router.post('/deleteContact', function(req, res)
{
  sess = req.session;
  var first = req.body.first_name;
  var last = req.body.last_name;

  if (validator.isEmpty(first) || validator.isEmpty(last))
  {
    res.send("Empty fields");
  }

  axios.post('https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/contactdelete',
  {
    "user_id" : sess.uName,
    "first_name" : first,
    "last_name" : last,
  })
  .then(function (response)
  {
    console.log(response);
    if (response.data == "delete")
    {
      res.send("success");
    }
    else
    {
      res.send("Failed to remove contact :(");
    }
  })
  .catch(function (error)
  {
    console.log(error);
  });
});

router.get('/contacts', function(req, res, next) 
{ 
  var contacts_json;
  
  res.render('contacts', {
    title: 'AWS RESULT',
    contacts: contacts_json
  });
});

//router.get('/remove/:id', function(req, res, next) {});

module.exports = router;
