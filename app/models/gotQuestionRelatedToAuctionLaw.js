const mongoose = require('mongoose')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const gotQuestionRelatedToAuctionLawSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    InqurierType:{type:String},
    email:{type:String},
    comment:{type:String},
    customer:{type:String},
    newLetter_status:{type:Boolean, default:false},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

gotQuestionRelatedToAuctionLawSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('GotQuestionRelatedToAuctionLaw',gotQuestionRelatedToAuctionLawSchema)