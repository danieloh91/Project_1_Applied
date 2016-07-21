var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    CompanySchema = new Schema({
      company_name: String,
      hq: String,
      founded: Number
    });

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
