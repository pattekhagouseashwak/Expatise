const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const webDevServiceSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    InqurierName:{type:String},
    InqurierType:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    comment:{type:String},
    newLetter_status:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

webDevServiceSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('WebDevServices',webDevServiceSchema)