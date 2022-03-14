const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const adsFeature_dbSchema = new mongoose.Schema(
  {
    AdvertisementID:{type:String},
    AuctionTitle:{type:String},
    typeofAuction:{type:String},
    featuredImage:{type:String},
    State:{type:String},
    Date:{type:String},
    Time:{type:String},
    StartsFrom:{type:String},
    EndOn:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

adsFeature_dbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdsFeature_db',adsFeature_dbSchema)