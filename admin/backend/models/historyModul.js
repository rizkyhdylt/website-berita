// models/historyModel.js
const {model, Schema} = require('mongoose')

const clickSchema = new Schema({
  beritaId: {
    type: Schema.Types.ObjectId,
    ref: 'Berita',
    required: true,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
});

const HistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  clicks: [clickSchema],
});

module.exports = model('Historys', HistorySchema);

    
