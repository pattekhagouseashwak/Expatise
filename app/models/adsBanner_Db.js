const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const adsBanner_dbSchema = new mongoose.Schema(
  {
    BannerID:{type:String},
    BannerImage:{type:String},
    StartsFrom:{type:String},
    EndOn:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

adsBanner_dbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdsBanner_db',adsBanner_dbSchema)