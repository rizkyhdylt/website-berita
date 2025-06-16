const { model, Schema } = require('mongoose');

const adsSchema = new Schema({
    image: {
        type: String,
        required: ""
    },
    image_public_id: {
        typre: String,
    }
})

module.exports = model('ads', adsSchema);
