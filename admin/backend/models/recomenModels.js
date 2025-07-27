const { Schema, model } = require('mongoose');

const recommendationSchema = new Schema({
   userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true
  },
  recommendedNews: [{
    type: Schema.Types.ObjectId,
    ref: 'news'
  }],
  favoriteCategory: {
    type: String,
    default: null
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

recommendationSchema.pre('save', function (next) {
  if (this.recommendedNews.length > 6) {
    this.recommendedNews = this.recommendedNews.slice(0, 6);
  }
  next();
});

module.exports = model('Recomens', recommendationSchema);
