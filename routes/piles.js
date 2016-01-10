var express = require('express');
var router = express.Router();
var models = require('../config/models/index');

// GET /piles
router.get('/', function(req, res) {
  models.Pile.findAll({}).then(function(piles) {
    res.json(piles);
  });
});

// GET /piles/:id
router.get('/:id', function(req, res) {
  models.Pile.find({
    where: {
      id: req.params.id
    }
  }).then(function(pile) {
    res.json(pile);
  });
});

// POST /piles
router.post('/', function(req, res) {
  models.Pile.create({
    name: req.body.name,
    location: req.body.location,
    items: req.body.items
  }).then(function(pile) {
    res.json(pile);
  });
});

// PUT /piles/:id
router.put('/:id', function(req, res) {
  models.Pile.find({
    where: {
      id: req.params.id
    }
  }).then(function(pile) {
    if(pile){
      pile.updateAttributes({
        name: req.body.name,
        location: req.body.location,
        items: req.body.items
      }).then(function(pile) {
        res.send(pile);
      });
    }
  });
});

// DELETE /piles/:id
router.delete('/:id', function(req, res) {
  models.Pile.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(pile) {
    res.json(pile);
  });
});

module.exports = router;
