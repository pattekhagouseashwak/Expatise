const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const advertInDashboardSchema = new mongoose.Schema(
  {

    AdvertDetails:{type:Object},

  },
  {
    versionKey: false,
    timestamps: true
  }
)

advertInDashboardSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AdvertInDashboard',advertInDashboardSchema)