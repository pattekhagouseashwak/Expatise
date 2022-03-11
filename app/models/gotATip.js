const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const gotATipSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    InqurierName:{type:String},
    InqurierType:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    comment:{type:String},
    newLetter_status:{type:Boolean, default:false},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

gotATipSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('gotATip',gotATipSchema)