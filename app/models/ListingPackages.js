const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2');

const ListingPackageSchema = new mongoose.Schema(
  {
    PackageName:{type:String},
    priceDetails:{type:String,default:require}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

ListingPackageSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('listingPackage',ListingPackageSchema)