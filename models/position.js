var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Company = require("./company.js"),
    PositionSchema = new Schema({
      position_name: String,
      location: String,
      referral: Boolean,
      job_url: String,
      _company: [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}]
    });

var Position = mongoose.model('Position', PositionSchema);

module.exports = Position;
