var mongoose = require('mongoose');

var PollOptionSchema = new mongoose.Schema({
  question_id: String,
  option: String,
  created_at: { type: Date, default: Date.now },
});


// methods ======================



module.exports = mongoose.model('PollOptions', PollOptionSchema,  'pollOptions');
