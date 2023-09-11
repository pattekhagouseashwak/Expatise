const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {ObjectId} = mongoose.Schema.Types;

const bookmarkSchema = new mongoose.Schema({
    profileId:  { type: ObjectId, ref: 'profile'},
    questionId: { type: ObjectId, ref: 'drivingmaterial'},
  },
  {
    versionKey: false,
    timestamps: true
  })

bookmarkSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('bookmark', bookmarkSchema);