const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const priceplansSchema = new mongoose.Schema({
  duration: { type: String, require: true },
  price: { type: String, require: true },
  isActive: { type: Boolean, default: false },
},
  {
    versionKey: false,
    timestamps: true
  })

priceplansSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('priceplans', priceplansSchema);