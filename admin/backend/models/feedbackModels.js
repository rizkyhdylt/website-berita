const { model, Schema } = require('mongoose');

const feedbackSchema = new Schema({
  newsId: { 
    type: Schema.Types.ObjectId, 
    ref: 'news', 
    required: true 
  }, 
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'authors',
    required: true
  },
  isRelevant: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Optional: unique index to prevent duplicates
feedbackSchema.index({ newsId: 1, userId: 1 }, { unique: true });

module.exports = model('feedbacks', feedbackSchema);
