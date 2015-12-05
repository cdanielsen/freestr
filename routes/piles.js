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

router.post('/', function(req, res, next) {
  var results = [];
  var data = {name: req.body.name, location: req.body.location, items: req.body.number_of_items};

  pg.connect(conString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
    }
    var query = client.query('INSERT INTO piles (name, location, number_of_items) VALUES ($1, $2, $3)', [data.name, data.location, data.items]);

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
