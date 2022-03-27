const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const CmsDataSchema = new mongoose.Schema(
    {
    aboutUs        :{type:String},
    dataSecurity      :{type:String},
    privacyPolicy      :{type:String},
    termsAndConditions      :{type:String},
    },
  {
    versionKey: false,
    timestamps: true
  }
)

CmsDataSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('CmsData',CmsDataSchema)
