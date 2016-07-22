var db = require('../models');

function index(req, res) {
  db.Position.find({}, function(err, succ) {
    if (err) {
      console.log(err);
    }
    res.json(succ);
  });
}

function create(req, res) {
  db.Position.create(req.body, function(err, succ) {
    if (err) {
      console.log(err);
    }
    res.json(succ);
  });
}

function show(req, res) {
  db.Position.findById(req.params.positionId, function(err, succ) {
    if (err) {
      console.log(err);
    }
    res.json(succ);
  });
}

function destroy(req, res) {
  var positionId = req.params.positionId;
  db.Position.findOneAndRemove({_id: positionId}, function(err, succ) {
    if (err) {
      console.log(err);
    }
    res.json(succ);
  });
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
