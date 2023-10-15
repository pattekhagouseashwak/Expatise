const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const storeSurveyResponseSchema = new mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'surveys', // Reference to the Survey model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile', // Reference to the User model
    required: true,
  },
  responses: [
    {
      type: { type: String, required: true }, // Example: 'multipleChoice', 'text', 'rating', radio etc.
      question: { type: String, required: true },
      options: [{ type: String, default: null }], // An array of option texts (for multiple choice questions)
      answer: { type: String, default: null }
    },
  ],
},
  {
    versionKey: false,
    timestamps: true
  })

storeSurveyResponseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('storeSurveyResponses', storeSurveyResponseSchema);