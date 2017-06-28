var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSchema = new Schema({
  term: String
}, { timestamps: true });

module.exports = mongoose.model('time', timeSchema);
