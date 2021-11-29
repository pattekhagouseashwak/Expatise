const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const auctionListingSchema = new mongoose.Schema(
  {
    Auctioneer      :{type:ObjectId,ref:"Auctioneer"},

    AuctionType     :{type:String},
    
    AuctionTitle    :{type:String},

    AuctionDate     :{type:String},

    AuctionTime     :{type:String},

    Address1 :{type:String},

    Address2 :{type:String},

    City     :{type:String},

    State    :{type:String},

    Country :{type:String},

    Zip     :{type:String},

    AuctionCategory :{type:String},
    
    CategoryDetails :{type:String},

    NameOfProduct   :{type:String},

    uploadPhoto     :{type:Object},

    ProductDescription :{type:Object},

    BiddingNotice :{type:Object},

    AuctionNotice:{type:Object},

    TermsAndCondition:{type:Object},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

auctionListingSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AuctionLisintg',auctionListingSchema)