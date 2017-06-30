var fetch = require('isomorphic-fetch')
var Term = require('./models/time');

module.exports = (app) => {

  app.get('/api/imagesearch/:term', function (req, res) {
    var searchTerm = new Term({
      term: req.params.term
    })

    searchTerm.save(function(err) {
      if (err) return res.send({ err: err })

      let url = `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${req.params.term}`

      if (req.query.offset) {
        // TODO: validate that this is a number using parseInt()
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
        .then(({ value }) => {
          const result = value.map(image => {
            const { name, contentUrl, hostPageUrl } = image
            return {
              name,
              contentUrl,
              hostPageUrl
            }
          })
          res.send(result)
        })
        .catch(err => console.log('error', err))
    })
  });

  app.get('/latest/imagesearch', function (req, res) {
    // return the 5 most recent searches
    Term.find({}, { term: 1 }).sort({ createdAt: -1 }).limit(5).exec(function(err, docs) {
      // TODO: handle possible errors
      res.send(docs)
    });
  });
}
