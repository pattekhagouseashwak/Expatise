const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const profileSchema = new mongoose.Schema(
  {
    profile: {type:String,default:null},

    profilePhoto: { type: String },

    name: { type: String },

    email: { type: String },

    phoneNumber: { type: String },

    city: { type: String },

    country: { type: String },

    dateOfBrith: { type: String },

    gender: { type: String },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

profileSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('profile', profileSchema)
