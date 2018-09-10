var mongoose = require('mongoose');

var PollResponseSchema = new mongoose.Schema({
  user_id: String,
  poll_id: String,
  option_id: String,
  created_at: { type: Date, default: Date.now },
});


// methods ======================



module.exports = mongoose.model('PollResponse', PollResponseSchema,  'pollResponse');
