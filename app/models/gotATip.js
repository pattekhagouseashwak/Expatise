const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const gotATipSchema = new mongoose.Schema(
  {
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

gotATipSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('gotATip',gotATipSchema)