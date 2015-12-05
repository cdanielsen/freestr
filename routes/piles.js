var express = require('express');
var pg = require('pg');
var router = express.Router();
var conString = "postgres://localhost:5432/freestr";

/* GET piles listing. */
router.get('/', function(req, res, next) {
  var results = [];

  pg.connect(conString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
    }
    var query = client.query('SELECT * FROM piles');
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});



module.exports = router;
