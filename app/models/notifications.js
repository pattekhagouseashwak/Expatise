const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  userIds : [{type: ObjectId, ref: 'profile', default:''}],
  deliveryTo: {
    type: String, require: true,
    enum: ['all', 'non-premium', 'premium',""],
    default:""
  }
},
  {
    versionKey: false,
    timestamps: true
  })

notificationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('notifications', notificationSchema);