const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const unpublishedSchema = new mongoose.Schema(
  {
    Auctioneer: { type: ObjectId, ref: "Auctioneer" },

    ListingID:{type:String},

    AuctionType: { type: String },

    AuctionTitle: { type: String },

    AuctionMonthYear: { type: String },

    AuctionDate: { type: String },

    AuctionTime: { type: String },

    Address1: { type: String },

    Address2: { type: String },

    City: { type: String },

    State: { type: String },

    Country: { type: String },

    Zip: { type: String },

    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

    AuctionCategory: { type: String },

    CategoryDetails: { type: String },

    NameOfProduct: { type: String },

    uploadPhoto: { type: Object },

    ProductDescription: { type: Object },

    BiddingNotice: { type: Object },

    AuctionNotice: { type: Object },

    TermsAndCondition: { type: Object },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

unpublishedSchema.index({ location: "2dsphere" });
unpublishedSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('UnPublished', unpublishedSchema)