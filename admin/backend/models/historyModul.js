// models/historyModel.js
const {model, Schema} = require('mongoose')

const HistorySchema = new Schema({
    userId: { 
        type: String, 
        required: true 
    },
    beritaId: { 
        type: String, 
        required: true 
    },
    clickedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = model('Historys', HistorySchema);

    
