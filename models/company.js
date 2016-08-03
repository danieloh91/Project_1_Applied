var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    /* This is technically okay, but it makes other developers cry. Keep it how we did it in the other labs, you savage. -jc */
    CompanySchema = new Schema({
      company_name: String,
      hq: String,
      founded: Number,
      /* TODO: Consider either creating a join table to connect the two models together or remove one of the foreign key relationships. -jc */
      _positions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Position'}]
    });

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
