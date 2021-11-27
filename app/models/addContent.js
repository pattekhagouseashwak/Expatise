const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const addContentSchema = new mongoose.Schema(
  {
    
    Auctioneer:{type:ObjectId,ref:"Auctioneer"},

    Title: {type: String}, //Video or Blog "Content"

    videoUrl: {type: String, default:undefined}, //Video Content

    AddDescribtion: {type: Object,default:undefined}, //Video Content

    BlogContent: {type:Object, default:undefined}, //BLOG

    UploadPhoto:{type:Object, default:undefined} //BLOG

  },
  {
    versionKey: false,
    timestamps: true
  }
)

addContentSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AddContent', addContentSchema)