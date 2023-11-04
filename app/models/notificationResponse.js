const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Schema.Types;

const notificationResponseSchema = new mongoose.Schema({
  notificationId: { type: ObjectId, ref: 'notifications', require: true },
  userId: { type: ObjectId, ref: 'profile', require:true }
},
  {
    versionKey: false,
    timestamps: true
  })

notificationResponseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('notificationResponse', notificationResponseSchema);