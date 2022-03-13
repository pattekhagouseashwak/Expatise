const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const typeSection_Schema = new mongoose.Schema(
  {
    typeID:{type:String},
    typeName:{type:String},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

typeSection_Schema.plugin(mongoosePaginate)
module.exports = mongoose.model('TypeSection',typeSection_Schema)