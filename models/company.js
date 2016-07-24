var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    CompanySchema = new Schema({
      company_name: String,
      hq: String,
      founded: Number,
      _positions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Position'}]
    });

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
