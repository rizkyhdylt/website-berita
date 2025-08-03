// commentModel.js
const {model, Schema} = require('mongoose')

const commentSchema = new Schema({
  newsId: {
    type: String,
    required: true
  },
  userId: {                                
    type: Schema.Types.ObjectId,
    ref: 'authors',                        
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model ('Comments', commentSchema);
