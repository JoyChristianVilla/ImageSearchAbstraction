var fetch = require('isomorphic-fetch')
var express = require('express');
var mongoose = require('mongoose')
var app = express();

/*var Image = require('./models/image');
mongoose.connect('mongodb://localhost/image-search')*/

var Term = require('./models/time');
mongoose.connect('mongodb://localhost/search-time')

app.get('/api/imagesearch/:term', function (req, res) {
  var searchTerm = new Term({
    term: req.params.term
  })

  searchTerm.save(function(err) {
    if (err) return res.send({ err: err })

    let url = `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${req.params.term}`

    if (req.query.offset) {
      url += `&count=${req.query.offset}`
    }

    fetch(url, {
      'method': 'GET',
      'headers': {
      'Ocp-Apim-Subscription-Key': 'a88b3a1e28d1432e8f48d4198eb8dd59',
      'X-MSEdge-ClientIP': req.ip,
      'X-Search-Location': 'lat:47.60357;long:-122.3295;re:100',
      'Host': 'api.cognitive.microsoft.com'
        }
      })
      .then(response => response.json())
      .then((data) => {
        const result = value.map(image => {
          const { name, contentUrl, hostPageUrl } = image
          return {
            name,
            contentUrl,
            hostPageUrl
          }
        })
        res.send(data)
      })
      .catch(err => res.send(err))
  })
});

app.get('/latest/imagesearch', function (req, res) {
  var cursor = Term.find({}).sort({when: 'desc'}).exec(function(err, docs) {
    res.send(docs)
  });
/*  cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         res.send(doc)
      }*/
});

app.listen(3000, function() {
  console.log('Congregation is running on port 3000');
});
