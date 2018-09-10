var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
  user_id: String,
  question: String,
  created_at: { type: Date, default: Date.now },
});


// methods ======================



module.exports = mongoose.model('Polls', PollSchema,  'polls');
