const {model, Schema} = require('mongoose')

const gallery_Schema = new Schema({
    writerId: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'authors'
    },
    url: {
        type: String,
        required:true
    }
})

module.exports = model('images', gallery_Schema)