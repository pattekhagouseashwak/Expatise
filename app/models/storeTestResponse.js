const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Schema.Types;

const storeTestResponseSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'profile' },
  examType: {
    type: String, require: true,
    enum: ['pratice', 'rapidfire', 'mistakesquiz', 'commonmistakes', 'realtest'], require: true
  },
  testResponse: [{
    questionId: { type: ObjectId, ref: 'drivingmaterial' },
    selectedOption: { type: String },
    correctAnswer: { type: String },
    status: { type: Number, default: 0 }
  }],
  testCompleted: { type: String, require: true, default: '00:00:00' },
  score: { type: Number, default: 0 }
},
  {
    versionKey: false,
    timestamps: true
  })

storeTestResponseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('storeTestResponse', storeTestResponseSchema);