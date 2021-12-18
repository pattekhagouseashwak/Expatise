const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const recommendedVideoSchema = new mongoose.Schema(
  {
    name :{type:String},
    title :{type:String},
    youtubeVideoURL :{type:String},
    activationDate:{type:String},
    expireDate:{type:String},
    display:{type:Boolean,default:false}
   },
  {
    versionKey: false,
    timestamps: true
  }
)

recommendedVideoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RecommendedVideo',recommendedVideoSchema)
