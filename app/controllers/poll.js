var Poll = require('../models/Polls');
var PollOptions = require('../models/PollOptions');
var PollResponse = require('../models/PollResponse');

exports.create =  function(req, res) {

    var data = {
      '_user': req.user,
      '_isAuth' : true
    }
    res.render('poll-create', data);
  };

exports.createOptions =  function(req, res) {
  Poll.findById(req.params.id, function(err, poll){
    if (err)
        throw err;

        var data = {
          '_user': req.user,
          '_isAuth' : true,
          'poll' : poll
        }
        res.render('poll-create-options', data);
      })
  };


exports.store =  function(req, res, done) {
      // create the user
      var newPoll      = new Poll();

      newPoll.user_id   = req.user._id;
      newPoll.question    = req.body.question;

      newPoll.save(function(err) {
          if (err)
              return done(err);

          return done(null, newPoll);
      })

        res.redirect('list-polls');
  };

exports.store =  function(req, res, done) {
    var newPoll      = new PollOptions();

    newPoll.user_id   = req.user._id;
    newPoll.question    = req.body.question;

    newPoll.save(function(err) {
        if (err)
            return done(err);

        return done(null, newPoll);
    })

      res.redirect('list-polls');
};

exports.list = function(req, res){
    Poll.find({user_id: req.user._id}, function(err, userPolls){
      if (err)
          throw err;

          var data = {
            '_user': req.user,
            '_isAuth' : true,
            'polls' : userPolls
          }
          res.render('poll-list', data);
    })
};


exports.view = function(req, res){

Poll.findById(req.params.id, function(err, poll){
  if (err)
      throw err;

      //  console.log(poll);
      //  throw new Error("my error message");
      var data = {
        '_user': req.user,
        '_isAuth' : true,
        'poll' : poll
      }
      res.render('poll-view', data);
    })
};
