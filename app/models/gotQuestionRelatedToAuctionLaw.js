const mongoose = require('mongoose')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const gotQuestionRelatedToAuctionLawSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    Email:{type:String},
    Your_Question:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

gotQuestionRelatedToAuctionLawSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('GotQuestionRelatedToAuctionLaw',gotQuestionRelatedToAuctionLawSchema)