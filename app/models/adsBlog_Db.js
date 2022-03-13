const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const adsBlog_dbSchema = new mongoose.Schema(
  {
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
    is_published:{type:Boolean, default:false}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

adsBlog_dbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdsBlog_db',adsBlog_dbSchema)