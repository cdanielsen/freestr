var express = require('express');
var router = express.Router();
var models = require('../config/models/index');

router.get('/', function(req, res) {
  models.Pile.findAll({}).then(function(piles) {
    res.json(piles);
  });
});

module.exports = router;
