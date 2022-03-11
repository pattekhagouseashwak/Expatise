const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const hostingServiceSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    InqurierName:{type:String},
    InqurierType:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    newLetter_status:{type:Boolean, default:false},
    customer:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

hostingServiceSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('HostingServices',hostingServiceSchema)