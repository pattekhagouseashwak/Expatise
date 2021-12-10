const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const BidSchema = new mongoose.Schema(
  {
    auctionType:{type:String,required:true},
    userId: {type:ObjectId, ref:"Bidder",requried:true},
    auctionId:{type:ObjectId, ref:"AuctionLisintg",requried:true}

    // qrCodeString: {type:String,required:false, default: undefined}
  },
 
  {
    versionKey: false,
    timestamps: true
  }
)

BidSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Bid',BidSchema)