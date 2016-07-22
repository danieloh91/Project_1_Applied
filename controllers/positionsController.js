var db = require('../models');

function index(req, res) {
  db.Position.find({}, function(err, succ) {
    if (err) {
      res.sendStatus(500);
    }
    res.json(succ);
  });
}

function create(req, res) {
  db.Position.create(req.body, function(err, succ) {
    if (err) {
      res.sendStatus(500);
    }
    res.json(succ);
  });
}

function show(req, res) {
  db.Position.findById(req.params.positionId, function(err, succ) {
    if (err) {
      res.sendStatus(500);
    }
    res.json(succ);
  });
}

function destroy(req, res) {

}

function update(req, res) {

}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
