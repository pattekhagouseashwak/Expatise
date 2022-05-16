const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2');

const BoostPackageDetailsSchema = new mongoose.Schema(
  {
    PackageName:{type:String},
    TickerPackage:{type:Number, default:0},
    FeaturedAuctionPackage:{type:Number, default:0},
    Featuredtype_National:{type: Number, default:0},
    Featuredtype_State:{type: Number, default:0},
    priceDetails:{type:String,default:require}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

BoostPackageDetailsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('boostPackageDetails',BoostPackageDetailsSchema)