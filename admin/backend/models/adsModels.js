const { model, Schema } = require('mongoose');

const adsSchema = new Schema({
    slotNumber: {
    type: Number, // 1 sampai 6
    required: true,
    unique: true // biar 1 slot cuma punya 1 data
  },
  image: {
    type: String,
    required: true
  }
},{ timestamps: true });

module.exports = model('ads', adsSchema);
