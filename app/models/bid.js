const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const BidSchema = new mongoose.Schema(
  {
    auctioneerCompanyName: {type:String,required:true},
    productName: {type:String,required:true},
    address: {type:String,required:true},
    date: {type:Date,required:true},
    time: {type:String,required:true}
  },

  {
    versionKey: false,
    timestamps: true
  }


)

BidSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Bid',BidSchema)