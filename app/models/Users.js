var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now },
});


// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Users', UserSchema,  'users');
