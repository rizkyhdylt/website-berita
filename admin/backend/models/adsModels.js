const { model, Schema } = require('mongoose');

const adsSchema = new Schema({
    image: {
        type: String,
        required: ""
    }
})

module.exports = model('ads', adsSchema);
