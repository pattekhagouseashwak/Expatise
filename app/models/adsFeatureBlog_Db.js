const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const adsFeatureBlog_dbSchema = new mongoose.Schema(
  {
    FeatureBlogID:{type:String},
    BlogID:{type:String},
    BlogTitle:{type:String},
    BlogLink:{type:String},
    AuctioneerID:{type:String},
    AuthorName:{type:String},
    Type:{type:String},
    Category:{type:String},
    BlogContent: {type:Object},
    featuredImage:{type:String},
    uploadBlogImage:{type:String},
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

adsFeatureBlog_dbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdsFeatureBlog',adsFeatureBlog_dbSchema)