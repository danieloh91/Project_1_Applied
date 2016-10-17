var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/p1applied");

module.exports.Position = require('./position.js');
module.exports.Company = require('./company.js');
module.exports.User = require('./user.js');
