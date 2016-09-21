var express = require('express');
var pg = require('pg');
var dbConfig = require('../config/db');

var router = express.Router();
var conString = dbConfig.conString;


/* LIST piles route */
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

/* GET pile route */
router.get('/:id', function(req, res, next) {
  var result, pileId;
  result = {};
  pileId = req.params.id;

  pg.connect(conString, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
    }
    var query = client.query('SELECT * FROM piles WHERE Id = ($1)', [pileId]);
    query.on('row', function(row) {
      result = row;
    });
    query.on('end', function() {
      done();
      return res.json(result);
    });
  })
})

/* POST piles route */
router.post('/', function(req, res, next) {
  var results = [];
  console.log(req.body);
  var data = {name: req.body.name,
              location: req.body.location,
              items: req.body.number_of_items};

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

/* DELETE piles route */
router.delete('/:id', function(req, res, next) {
  var results = [];
  var target = parseInt(req.params.id);
  pg.connect(conString, function (err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    client.query(`DELETE FROM piles WHERE id=${target}`);
    var query = client.query("SELECT * FROM piles ORDER BY ID DESC");

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
