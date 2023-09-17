const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const adminloginsSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  token: {type:String}
},
  {
    versionKey: false,
    timestamps: true
  })

adminloginsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('adminlogins', adminloginsSchema);