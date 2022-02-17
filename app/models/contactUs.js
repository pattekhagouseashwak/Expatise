const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const contactUsSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    name:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    message:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

contactUsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('contactUs',contactUsSchema)