var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    CompanySchema = new Schema({
      HQ: String,
      Founded: Number
    });

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
