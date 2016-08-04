var db = require('../models');

function create(req, res){

  var position = {
    position_name: req.body.position_name,
    location: req.body.location,
    referral: req.body.referral,
    job_url: req.body.job_url
  };
  var company = {
    company_name: req.body.company_name,
    hq: req.body.hq,
    founded: req.body.founded,
    _positions: []
  };

  db.Company.create(company, function(err, succ){
    db.Position.create(position, function(err, newPosition){
      succ._positions.push(newPosition._id);
      succ
        .populate('_positions')
        .exec(function(err, succ){
          /* TODO: Add error handling -jc */
          /* TODO: Please keep debugging code out of production versions of your project -jc */
          console.log("SUCCESS:\n"+succ+'\n');
          res.json(succ);
        });
    });
  });
  // company._positions.push(position);
  // console.log(company);
  // res.json(company);
}

module.exports = {
  create: create,
};
