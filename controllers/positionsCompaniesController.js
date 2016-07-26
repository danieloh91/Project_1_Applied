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

function update(req, res) {
  // var company = db.Company;
  // var position = db.Position;
  var body = req.body;
  console.log('body: ', body);

  //see what's in the body, then make sure that when you're selecting from the dropdown that you're getting the value
  // company.create(company._id, function(err){
  //   console.log('positions id: ', position._id);
  //   if (err){
  //     res.json(err);
  //   } else {
  //     company._positions.push(positions._id);
  //     position._company = company._id;
  //     company.save();
  //     position.save();
  //   }
  // });
}


//   var companyId = req.params.companyId;
//   var body = req.body;
//   db.Company.findByIdAndUpdate(companyId, body, {new: true}, function(err, succ) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(succ);
//     }
//   });
// }

//create position, make sure proper company id is attached to it, then push into the positions array

module.exports = {
  index: index,
  // create: create,
  show: show,
  // destroy: destroy,
  update: update
};
