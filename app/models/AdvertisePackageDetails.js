const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2');

const priceDetailSchema = new mongoose.Schema({

  price: { type: String }
}, {
  versionKey: false,
  timestamps: true
});

const AdvertisePackageDetailSchema = new mongoose.Schema(
  {
    PackageName: { type: String },
    typePackage_National: { type: Number, default: 0 },
    typePacakge_State: { type: Number, default: 0 },
    priceDetails: { type: String,default:require }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

AdvertisePackageDetailSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('advertisePackageDetails', AdvertisePackageDetailSchema)