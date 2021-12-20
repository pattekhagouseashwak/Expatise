const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const writeToUsSchema = new mongoose.Schema(
  {

    userID:{type:String},
    name:{type:String},
    description:{type:String},
    email:{type:String},
    message:{type:String},

    attachment:{type:String},
    priority:{type:String},

  },
  {
    versionKey: false,
    timestamps: true
  }
)

writeToUsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('writeToUs',writeToUsSchema)