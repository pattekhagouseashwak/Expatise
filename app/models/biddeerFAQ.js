const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const biddeerFAQSchema = new mongoose.Schema(
  {
    question:{type:String},
    answer:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

biddeerFAQSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('BiddeerFAQ',biddeerFAQSchema)