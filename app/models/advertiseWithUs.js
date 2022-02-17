const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const advertiseWithUsSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    name:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    message:{type:String},

    company:{type:String},
    country:{type:String},
    state:{type:String},

  },
  {
    versionKey: false,
    timestamps: true
  }
)

advertiseWithUsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('advertiseWithUs',advertiseWithUsSchema)