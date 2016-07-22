var db = require("./models");

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

db.Position.remove({}, function addPositions(err, succ){

  db.Position.create(positionsList, function addedPositions(err, succ){
    if(err){return console.log(err);}
    console.log(succ);
    process.exit();
  });

});
