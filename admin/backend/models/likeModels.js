const {model, Schema} = require('mongoose');

const likeSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    targetId: { 
        type: Schema.Types.ObjectId,    
        required: true 
    },
    targetType: { 
        type: String, 
        required: true 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

likeSchema.index({ userId: 1, targetId: 1, targetType: 1 }, { unique: true });

module.exports = model('Likes', likeSchema);