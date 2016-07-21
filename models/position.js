var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    PositionSchema = new Schema({
      position_name: String,
      location: String,
      referral: Boolean,
      job_url: String,
      _company: Company._id
    });

var Position = mongoose.model('Position', PositionSchema);

module.exports = Position;
