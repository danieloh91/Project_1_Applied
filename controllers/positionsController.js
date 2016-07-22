var db = require('../models');

function index(req, res) {
  db.Position.find({}, function(err, position) {
    if (err) {
      res.sendStatus(500);
    }
    res.json(position);
  });
}

function create(req, res) {

}

function show(req, res) {

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
