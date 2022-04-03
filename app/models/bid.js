const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const BidSchema = new mongoose.Schema(
  {
    category:{type:String,require:true},
    auctionType:{type:String,required:true},
    userId: {type:ObjectId, ref:"Bidder",requried:true},
    auctionId:{type:ObjectId, ref:"AuctionLisintg",requried:true},
    auctioneerCompanyName:{type:String,required:true},
    productName:{type:String,required:true},
    address:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    BidderID:{type:String,required:true},
    BidderName:{type:String,required:true},
    BidderEmail:{type:String,required:true},
    BidderContact:{type:String,required:true},
    RequestNo:{type:String,required:true},
    // qrCodeString: {type:String,required:false, default: undefined}
  },
 
  {
    versionKey: false,
    timestamps: true
  }
)

BidSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Bid',BidSchema)