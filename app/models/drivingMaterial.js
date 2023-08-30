const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const {ObjectId} = mongoose.Schema.Types

const drivingmaterialSchema = new mongoose.Schema({
  type: { type: String, required: true },                     // 'multiple-choice' or 'true-false'
  category: { type: ObjectId, ref: "category", default: null},// category type
  question: { type: String, required: true },                 //  questions
  image: { type: String, default: null },                     //  images
  options: [{ type: String, default: null }],                 // Array of answer choices
  correctanswers: {type: String, require:true}                // Array of correct answer choices
},
  {
    versionKey: false,
    timestamps: true
  }
)

drivingmaterialSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('drivingmaterial',drivingmaterialSchema);