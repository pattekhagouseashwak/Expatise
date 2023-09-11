const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Schema.Types;

const storeTestResponseSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'profile' },
  testResponse: [{
    questionId: { type: ObjectId, ref: 'drivingmaterial' },
    selectedOption: { type: String },
    correctAnswer: { type: String }
  }],
},
  {
    versionKey: false,
    timestamps: true
  })

storeTestResponseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('storeTestResponse', storeTestResponseSchema);