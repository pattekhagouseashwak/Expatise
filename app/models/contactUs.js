const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const contactUsSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    InqurierName:{type:String},
    InqurierType:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    comment:{type:String},
    customer:{type:String},
    newLetter_status:{type:Boolean, default:false}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

contactUsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('contactUs',contactUsSchema)