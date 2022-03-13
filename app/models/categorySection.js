const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const categorySection_Schema = new mongoose.Schema(
  {
    categoryID:{type:String},
    categoryName:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

categorySection_Schema.plugin(mongoosePaginate)
module.exports = mongoose.model('CategorySection',categorySection_Schema)