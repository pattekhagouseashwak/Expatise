const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const surveySchema = new mongoose.Schema({
  title: {type: String,required: true},
  description:{type: String},
  questions: [
    {
      type: {type: String,required: true}, // Example: 'multipleChoice', 'text', 'rating', radio etc.
      question: {type: String,required: true},
      options: [{type: String, default: null}], // An array of option texts (for multiple choice questions)
    },
  ],
  isActive: {type : String, default: false}
},
  {
    versionKey: false,
    timestamps: true
  })

surveySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('surveys', surveySchema);