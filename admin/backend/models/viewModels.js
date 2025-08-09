const { model, Schema } = require('mongoose');

const viewSchema = new Schema({
  newsId: {
    type: Schema.Types.ObjectId,
    ref: 'news',
    required: true,
    unique: true // Satu dokumen per newsId
  },
  userIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  totalViews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = model('views', viewSchema);
