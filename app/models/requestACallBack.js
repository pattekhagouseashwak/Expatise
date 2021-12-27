const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const requestACallBackSchema = new mongoose.Schema(
  {
    TicketID:{type:String},
    reqName:{type:String},
    desc:{type:String},
    time:{type:String},
    date:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    userID:{type:ObjectId},
    entityType:{type:String},
    Status:{type:String,default:"Raised"}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

requestACallBackSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('requestACallBack',requestACallBackSchema)