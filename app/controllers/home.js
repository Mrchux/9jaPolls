exports.index =  function(req, res) {

    var data = {
      '_isAuth' : false
    }
    res.render('home', data);
  };
