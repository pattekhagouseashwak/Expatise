const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const AuctionCategorySchema = new mongoose.Schema(
  {
    CatergoryName :{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

AuctionCategorySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AuctionCategory',AuctionCategorySchema)
