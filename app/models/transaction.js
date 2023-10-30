const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile', // Reference to the User model
    required: true,
  },
  priceplan:{ type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, required: true },
  log: [{ type: String, required: true }]
},
  {
    versionKey: false,
    timestamps: true
  })

transactionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('transaction', transactionSchema);