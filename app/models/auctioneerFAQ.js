const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const auctioneerFAQSchema = new mongoose.Schema(
  {
    question:{type:String},
    answer:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

auctioneerFAQSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AuctioneerFAQ',auctioneerFAQSchema)