const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const adsBlog_dbSchema = new mongoose.Schema(
  {

    AdvertisementID:{type:String},
    BlogTitle:{type:String},
    BlogLink:{type:String},
    featuredImage:{type:String},
    State:{type:String},
    Date:{type:String},
    Time:{type:String},
    StartsFrom:{type:String},
    EndOn:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

adsBlog_dbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdsBlog_db',adsBlog_dbSchema)