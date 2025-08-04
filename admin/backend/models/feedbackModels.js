const { model, Schema } = require('mongoose');

const feedbackSchema = new Schema({
    newsId: { 
        type: Schema.Types.ObjectId, 
        ref: 'news', 
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


module.exports = model('feedbacks', feedbackSchema);