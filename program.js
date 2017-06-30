var express = require('express');
var mongoose = require('mongoose')
var app = express();

// Remove deprecation warning by telling mongoose to use Node's default Promise library
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/search-time')

// Move our routes to another file to clean up our main app file
require('./routes')(app)

app.listen(3000, function() {
  console.log('Congregation is running on port 3000');
});
