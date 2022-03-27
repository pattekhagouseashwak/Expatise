const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const customTickerSchema = new mongoose.Schema(
  {
    startDate:{type:String,required:true},
    tickerSymbol:{type: String},
    endDate:{type:String,required:true},
      FirstName:{type: String},
      LastName:{type: String},
    redirectLink: {type: String},
    AuctioneerListing: {type:ObjectId, ref: "AuctionLisintg"}
  },
 
  {
    versionKey: false,
    timestamps: true
  }
)

customTickerSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('customTicker',customTickerSchema)