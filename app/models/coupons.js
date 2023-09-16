const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Schema.Types;

const couponSchema = new mongoose.Schema({
  couponName: { type: String },
  couponValue: { type: String },
  months: { type: String },
},
  {
    versionKey: false,
    timestamps: true
  })

couponSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('coupons', couponSchema);