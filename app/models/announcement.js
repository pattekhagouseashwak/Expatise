const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const announcementSchema = new mongoose.Schema({
  heading: { type: String },
  subject: { type: Object },
},
  {
    versionKey: false,
    timestamps: true
  })

announcementSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('announcements', announcementSchema);