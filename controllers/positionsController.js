var db = require('../models');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

function index(req, res) {
  db.Position.find({})
    .populate('_company')
    .exec(function (err, company) {
    if (err) return handleError(err);
    //console.log('Gigantic Position with attached Company: ', company);
    res.json(company);
  });
}
// initial attempt
// function createPosition(res, err, company, position) {
//   if (err) res.json(err);
//   else {
//     position.company_id = company._id;
//     position.save();
//     company._positions.push(position._id);
//     company.save();
//     res.json(position);
//   }
// }
//
// function create(req, res) {
//   db.Company.find({company_name: req.body.company}, function(err, companies){
//     // scenario 1: error connecting to db which returns err.
//     // scenioar 2: company_name is not yet in db which returns []
//     // scenario 3: company_name is in db which returns [company_obj]
//     if (err) res.json(err);
//     else if (companies.length===0){
//       db.Company.create(req.body, function(err, company){
//         if (err) res.json(err);
//         db.Position.create(req.body, function(err, position){
//           createPosition(res, err, company, position);
//         });
//       });
//     }
//     else {
//       var company = companies[0];
//       db.Position.create(req.body, function(err, position){
//         createPosition(res, err, company, position);
//       });
//     }
//   });
// }

function create(req, res) {
  var data = req.body;
  var position = new db.Position({
    position_name: data.position_name,
    location: data.location,
    referral: data.referral,
    job_url: data.job_url
  });
  var company = new db.Company({
    company_name: data.company_name,
    hq: data.hq,
    founded: data.founded
  });

  company.save(function(err){
    if (err) res.json(err);
    position.save(function(err){
      if (err) res.json(err);
      db.Company.findById(company._id, function(err, company){
        if (err) res.json(err);
        db.Position.findById(position._id, function(err, position){
          company._positions.push(position._id);
          position._company = company._id;
          company.save();
          position.save();
        });
      });
    });
  });



  // console.log('company: ', company);
  // company.save();
  // position.save();
  // console.log('company name: ', company.company_name);
  //
  // var test = db.Position.findById({"_id": position._id});
  // console.log(test);

  // db.Company.findById({"_id": company._id}, function(err, company){
  //   if (err) res.json(err);
  //   console.log('company: ', company);
  //   db.Position.findById(position._id, function(err, position){
  //     if (err) res.json(err);
  //     company._positions.push(position._id);
  //     position._company = company._id;
  //     company.save();
  //     position.save();
  //     res.json(position);
  //   });
  // });

  // db.Company.find({name: data.company_name}, function(err, company){
  //   db.Position.find({position})
  // })

  // company.save(function insertPosition(err, newComp){
  //   position.save(function insertDeeper(err, newPos){
  //     newComp._positions.push(newPos);
  //     newComp.save(function sendBackToClient(err, succ){
  //       console.log('succ: ', succ);
  //       // succ.find({}).populate('_positions').exec(function(err, sweet){
  //       //   console.log("POPULATED: " , sweet);
  //       //   // res.json({done : false});
  //         res.json(succ);
  //       // });
  //     });
  //   });
  // });
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
    } else {
      // succ.position_name = req.body.position_name;
      // succ.location = req.body.location;
      // succ.referral = req.body.referral;
      // succ.job_url = req.body.job_url;
      // succ.save(function (err, succ){
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     res.json(succ);
      //   }
      // });
      res.json(succ);
    }
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
