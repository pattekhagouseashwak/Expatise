const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const listingPolicySchema = new mongoose.Schema(
  {
    policy:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

listingPolicySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('ListingPolicy',listingPolicySchema)