const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const adsPrint_dbSchema = new mongoose.Schema(
  {

    AdvertisementID:{type:String},
    CustomBanner:{type:String},
    TypeOfAuction:{type:String},
    State:{type:String},
    Date:{type:String},
    Time:{type:String},
    StartsFrom:{type:String},
    EndOn:{type:String},
    PrintAdTitle:{type:String},
    ActionLink:{type:String},
    LogoOfTheCompany:{type:String},
    PrintImage:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

adsPrint_dbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdsPrint_db',adsPrint_dbSchema)