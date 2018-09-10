exports.dashboard = function(req, res){

  var data = {
    '_user': req.user,
    '_isAuth' : true
  }
  res.render('dashboard', data);
}
