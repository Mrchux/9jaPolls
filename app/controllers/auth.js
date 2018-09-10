exports.login =  function(req, res) {

    var data = {
      '_isAuth' : false
    }
    res.render('login', data);
  };

exports.logout = function(req, res) {
      req.logout();
      res.redirect('/');
  };

exports.register =  function(req, res) {

    var data = {
      '_isAuth' : false
    }
    res.render('register', data);
  };
