const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const webDevServiceSchema = new mongoose.Schema(
  {
    InqueryNo :{type:String},
    First_Name:{type:String},
    Last_Name:{type:String},
    Phone_Number:{type:String},
    Email:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

webDevServiceSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('WebDevServices',webDevServiceSchema)