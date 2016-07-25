var db = require('../models');

function index(req, res) {
  db.Company.find({})
    .populate('_positions')
    .exec(function(err, succ){
      console.log(succ);
      res.json(succ);
    });
}

function show(req, res) {
  db.Company.findById(req.params.companyId, function(err, succ) {
    if (err) {
      console.log(err);
    }
    res.json(succ);
  });
}

module.exports = {
  index: index,
  // create: create,
  show: show
  // destroy: destroy,
  // update: update
};
