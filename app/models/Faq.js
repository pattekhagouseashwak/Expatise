const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const FaqSchema = new mongoose.Schema(
  {
    question :{type:String},
    answer: {type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

FaqSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Faq', FaqSchema)
