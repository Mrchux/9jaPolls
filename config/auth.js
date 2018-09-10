var LocalStrategy   = require('passport-local').Strategy;
var User = require('../app/models/Users');

module.exports = function(app, passport) {

  // =========================================================================
  // Local SignIn ==================================================
  // =========================================================================
  passport.use('local-login', new LocalStrategy(
  function(username, password, done) {

    User.findOne({email: username }, function(err, user) {

      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
  ));

      // =========================================================================
      // Local SignUp ==================================================
      // =========================================================================
  passport.use('local-register', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
      /*console.log(req.body.email);
      throw new Error("my error message");*/
        if (username !== null && username !== '')
            email = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            /*console.log(email);
            throw new Error("my error message");*/
        if(password != req.body.confirmpassword)
          return done(null, false, { message: 'Both password not the same' }/*req.flash('signupMessage', 'That email is already taken.')*/);

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'email' :  username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, { message: 'That email is already taken.' }/*req.flash('signupMessage', 'That email is already taken.')*/);
                    } else {

                        // create the user
                        var newUser      = new User();

                        newUser.email   = username;
                        newUser.name    = req.body.name;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }
  ));

  // =========================================================================
      // passport session setup ==================================================
      // =========================================================================
      // required for persistent login sessions
      // passport needs ability to serialize and unserialize users out of session

      // used to serialize the user for the session
      passport.serializeUser(function(user, done) {
          done(null, user.id);
      });

      // used to deserialize the user
      passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
              done(err, user);
          });
      });




}
