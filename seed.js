var db = require("./models");

// form that takes position name, location, referral, job_url, company's name
// 

var positionsList = [
  {
    position_name: 'Software Engineer - Release',
    location: 'San Francisco, CA',
    referral: false,
    job_url: 'https://www.dropbox.com/jobs/listing/91413',
    // _company: Company._id
  },
  {
    position_name: 'Software Engineer, Full Stack (RoR)',
    location: 'San Francisco, CA',
    referral: true,
    job_url: 'https://www.smartrecruiters.com/UserTesting/92909872-software-engineer-full-stack-ror-',
    // _company: Company._id
  },
  {
    position_name: 'Front End Software Engineer',
    location: 'San Francisco, CA',
    referral: true,
    job_url: 'https://www.google.com/about/careers/jobs?src=Online/Job%20Board/indeed&utm_source=indeed&utm_medium=jobaggr&utm_campaign=freeaggr#!t=jo&jid=/google/front-end-software-engineer-345-spear-st-san-francisco-ca-usa-1490015',
    // _company: Company._id
  }
];

var companiesList = [
  {
    company_name: 'Dropbox',
    hq: 'San Francisco, CA',
    founded: 2007
  },
  {
    company_name: 'UserTesting',
    hq: 'San Francisco, CA',
    founded: 2007
  },
  {
    company_name: 'Google',
    hq: 'Mountain View, CA',
    founded: 1998
  }
];


// db.Position.remove({}, function addPositions(err, succ){
//
//   db.Position.create(positionsList, function addedPositions(err, succ){
//     if(err){return console.log(err);}
//     console.log(succ);
//     process.exit();
//   });
//
// });

// get all companies
db.Company.find({}, function getAllCompanies(err,companies) {
  // iterate through each company in your database
  companiesList.forEach(function(company, index) {
    // create a temporary array of positions with a single
    // company's _id inserted into their foreign key
    var tempPositions = positionsList.map(function(pos){
        pos._company = companiesList._id;
        console.log(pos);
        return pos;
    });
    console.log(tempPositions);
    // create all of those temporary positions
    db.Positions.create(tempPositions, function createPos(err, positions) {
        // check the first position returned to make sure
        // there is a _company value populated.
        console.log(positions[0]._company);
    });

    // profit
  });
});
