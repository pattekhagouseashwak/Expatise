const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const recommendedVideoSchema = new mongoose.Schema(
  {
    VideoID:{ type: ObjectId, ref: "AdsVideo_db" },
    position:{type:String, default: "", unique: true},
   },
  {
    versionKey: false,
    timestamps: true
  }
)

recommendedVideoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RecommendedVideo',recommendedVideoSchema)