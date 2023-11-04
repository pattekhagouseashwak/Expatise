const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const profileSchema = new mongoose.Schema(
  {
    profilePhoto: { type: String },

    name: { type: String },

    email: { type: String },

    phoneNumber: { type: String },

    city: { type: String },

    country: { type: String },

    dateOfBrith: { type: String },

    gender: { type: String },

    weChat:{type:String},

    lastSeen : {type:Date,default: Date.now},
    
    type: {
      type: String, require: true,
      enum: ['guest', 'non-premium', 'premium'], require: true
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

profileSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('profile', profileSchema)
