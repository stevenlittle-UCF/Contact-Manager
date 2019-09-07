# Contact-Manager
TODOS:

    - login/sign up page
        - need users table in the DB
            - need fields for username, pw (hashed), and a foreing key (to link the username to their contacts for querying )
        - html forms 
        - php code to post username, pwd
        - php code to query the DB and authenticate 
        - the CSS for the login page
    - contacts stuff
        - contacts table in the DB
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
