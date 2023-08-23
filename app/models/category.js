const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const categorySchema = new mongoose.Schema(
  {
    name :{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

categorySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('category',categorySchema)