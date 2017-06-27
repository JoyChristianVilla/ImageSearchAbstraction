var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  imageURL: String,
  description: String,
  pageURL: String
});

module.exports = mongoose.model('image', imageSchema);
