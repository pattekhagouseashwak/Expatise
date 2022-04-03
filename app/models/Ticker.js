const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const TickerSchema = new mongoose.Schema(
  {
    ListingID:{type:String},
    typeOfAuction:{type:String},
    AuctionDate:{type:String},
    Auctiontime:{type:String},
    tickerSymbol:{type:String},
    startDate:{type:Date},
    endDate:{type:Date},
    redirectUrl:{type:String,default:undefined}
  },
 
  {
    versionKey: false,
    timestamps: true
  }
)

TickerSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Ticker',TickerSchema)