const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Schema.Types;

const adsWatchSchema = new mongoose.Schema({
  userid: { type: ObjectId, ref: 'profile' },
  realTest: { type: Number, default: 0 },
  statistics: { type: Number, default: 0 },
  mockTest: { type: Number, default: 0 },
  allTestQuestions: { type: Number, default: 0 },
  startDateTime: { type: String },
  endDateTime: { type: String },
}, {
  versionKey: false,
  timestamps: true
})
adsWatchSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('adsWatch', adsWatchSchema);