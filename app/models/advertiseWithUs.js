const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const advertiseWithUsSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    InqurierName:{type:String},
    InqurierType:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    comment:{type:String},
    company:{type:String},
    country:{type:String},
    state:{type:String},
    customer:{type:String}, 
    newLetter_status:{type:Boolean, default:false},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

advertiseWithUsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('advertiseWithUs',advertiseWithUsSchema)