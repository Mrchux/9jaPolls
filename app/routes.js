var homeController = require('./controllers/home');
var authController = require('./controllers/auth');
var usersController = require('./controllers/users');
var pollController = require('./controllers/poll');
var middleware = require('./middleware')

module.exports = function(app, passport) {

  require('../config/auth')(app, passport);
  // GET home page.
  app.get('/', homeController.index);

  // GET login page.
  app.get('/login', authController.login);

  // GET logout page.
  app.get('/logout', authController.logout);

  // GET register page.
  app.get('/register', authController.register);

  // GET dashboard page.
  app.get('/dashboard', middleware.isAuthenticated, usersController.dashboard);



  // POST login page.
  app.post('/login', passport.authenticate('local-login',
      { successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true }));

  //POST register page
  app.post('/register', passport.authenticate('local-register',
  { successRedirect: '/dashboard',
    failureRedirect: '/register',
    failureFlash: true }));

    /*app.post('/register', function (req, res) {
      console.log(req, res);
      throw new Error("my error message");
    })*/


    // GET register page.
    app.get('/create-poll', middleware.isAuthenticated, pollController.create);

    app.get('/list-polls', middleware.isAuthenticated, pollController.list);

    app.get('/view-poll/:id', middleware.isAuthenticated, pollController.view);

    app.post('/store-poll', middleware.isAuthenticated, pollController.store);

    app.get('/create-poll-options/:id', middleware.isAuthenticated, pollController.createOptions);

}
