var db = require('../models');

function index(req, res) {
  db.Company.find({})
    .populate('_positions')
    .exec(function(err, succ){
      /* TODO: Include an error conditional -jc */
      /* TODO: Please keep debugging code out of production versions of your project -jc */
      console.log(succ);
      res.json(succ);
    });
}

function show(req, res) {
  db.Company.findById(req.params.companyId, function(err, succ) {
    if (err) {
      /* TODO: return this console log to properly escape the db call after hitting an error -jc */
      console.log(err);
    }
    res.json(succ);
  });
}

function update(req, res) {
  /* TODO: Please remove commented code form production versions of your project -jc */
  // var company = db.Company;
  // var position = db.Position;
  var body = req.body;
  /* TODO: Please keep debugging code out of production versions of your project -jc */	
  console.log('body: ', body);
  /* TODO: Please remove commented code form production versions of your project -jc */
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

/* TODO: Please remove commented code form production versions of your project -jc */
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
  /* TODO: Please remove commented code form production versions of your project -jc */
  // create: create,
  show: show,
  /* TODO: Please remove commented code form production versions of your project -jc */
  // destroy: destroy,
  update: update
};
