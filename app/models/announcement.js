const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const announcementSchema = new mongoose.Schema({
  heading: { type: String, require:true},
  headingColorCode:{ type: String, require:true},
  subject: { type: Object ,require:true},
},
  {
    versionKey: false,
    timestamps: true
  })

announcementSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('announcements', announcementSchema);