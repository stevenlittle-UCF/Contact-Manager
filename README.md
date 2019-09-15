
# API


API


login (POST):
https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/login

returns: "SUCCESS" on 201

post body json:
```
{
    "user_id": "test",
    "pwd" : "pass"
}
```

register user (POST)

https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/users

returns "user add" on 201
```

{
    "user_id" : "user_id",
    "first" : "Jim",
    "last" : "Jones",
    "pwd" : "myhashedpw",
    "mail" : "myemail@example.com"
}

```
add contact(POST) https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/contactadd

returns "contact added on 201
```
{
	"user_id" : "user_id",
    "first_name" : "Josh",
    "last" : "jones",
    "mail" : "myemail@example.com",
    "city" : "Orlando",
    "state" : "Florida"
    }

```

lookup contacts (POST) https://nckcvqqm1m.execute-api.us-east-2.amazonaws.com/dev/lookup
```
{ "user_id" : "userid" }
```
returns an array of JSON contact objects




















# Contact-Manager
TODOS:

    - --login/sign up page
        - need users table in the DB
            - need fields for username, pw (hashed), and a foreing key (to link the username to their contacts for querying )
        - html forms 
        - php code to post username, pwd
        - php code to query the DB and authenticate 
        - the CSS for the login page
    - contacts stuff TODO: josh
        - contacts table in the DB
            - dbh.php
            - a contact could look something like this
                - foreing key
                - name
                - email
                - address
                - etc
            so, all the contacts for all users are in the same table, and to get a users set of contacts we just query all the contacts with the respective key
        - html forms to add contacts
            - php code to post and add to DB
        - html forms to search for contacts
            - php code to query the DB
    - permission stuff
        - make sure users only access what they need to
    - back ups
        - system to back up the DB and make sure we can recover data
