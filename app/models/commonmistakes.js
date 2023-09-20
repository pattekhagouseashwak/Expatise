const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {ObjectId} = mongoose.Schema.Types;

const commonmistakesSchema = new mongoose.Schema({
    userId:  { type: ObjectId, ref: 'profile'},
    examType: {
      type: String, require: true,
      enum: ['pratice', 'rapidfire', 'mistakesquiz', 'commonmistakes', 'realtest'], require: true
    },
    questionId: { type: ObjectId, ref: 'drivingmaterial'},
    status:{type: Number, require:true}
  },
  {
    versionKey: false,
    timestamps: true
  })

commonmistakesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('commonmistakes', commonmistakesSchema);