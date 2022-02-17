const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const commentSchema = new mongoose.Schema({

  reply_Name: {type:String},

  message:{type:String},

},{
  versionKey: false,
  timestamps: true
});

const writeToUsSchema = new mongoose.Schema(
  {
    TicketID:{type:String},
    reqName:{type:String},
    userID:{type:String},
    name:{type:String},
    description:{type:String},
    email:{type:String},
    message:{type:String},
    attachment:{type:String},
    priority:{type:String},
    Status:{type:String,default:"Raised"},
    entityType:{type:String},
    comments:[commentSchema]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

writeToUsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('writeToUs',writeToUsSchema)