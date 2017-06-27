var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSchema = new Schema({
  term: String,
  when: String
});

module.exports = mongoose.model('time', timeSchema);
