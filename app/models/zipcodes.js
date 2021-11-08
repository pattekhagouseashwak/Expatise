const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const zipCodeSchema = new mongoose.Schema(
  {
    zip_code: {type: Number},

    latitude: {type: String},

    longitude: {type: String},

    city:{type:String,required:true},

    state:{type: String,required: true},

    country:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

zipCodeSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('zipCode', zipCodeSchema)