const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Schema.Types;

const storeTestResponseSchema = new mongoose.Schema({
  examType:{type:String,enum: ['pratice', 'rapidfire', 'mistakesquiz','commonmistakes','realtest'],require:true},
  user: { type: ObjectId, ref: 'profile'},
  testResponse: [{
    questionId: { type: ObjectId, ref: 'drivingmaterial' },
    selectedOption: { type: String },
    correctAnswer: { type: String }
  }],
  closureTime: {type : String, require:false,default:'00:00:00'}
},
  {
    versionKey: false,
    timestamps: true
  })

storeTestResponseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('storeTestResponse', storeTestResponseSchema);