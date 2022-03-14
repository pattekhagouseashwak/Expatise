const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const adsVideo_dbSchema = new mongoose.Schema(
  {
    videoID:{type:String},
    VideoTitle:{type:String},
    VideoLink:{type:String},
    PostedBy: {type:String},
    CoverImage:{type:String},
    State:{type:String},
    Date:{type:String},
    Time:{type:String},
    StartsFrom:{type:String},
    EndOn:{type:String},
    is_published:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

adsVideo_dbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdsVideo_db',adsVideo_dbSchema)