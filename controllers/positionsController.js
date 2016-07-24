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
  db.Company.find({company_name: req.body.company}, function(err, companies){
    if (err) res.json(err);
    else {
      var company = companies[0];
      db.Position.create(req.body, function(err, position){
        // res.json(company);
        // ^^^ giving an array with company object.
        // THIS IS NOT WHAT WE WANT.
        // if you validate that you can never have repeat company, then you can fix this by doing this vvv

        if (err) res.json(err);
        else {
          position.company_id = company._id;
          position.save();
          // ^^^ still wrong.

          company._positions.push(position._id);
          company.save();
          res.json(position);
        }
      });
    }
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
  var positionId = req.params.positionId;
  var body = req.body;
  db.Position.findByIdAndUpdate(positionId, body, {new: true}, function(err, succ) {
    if (err) {
      console.log(err);
    }
    res.json(succ);
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
