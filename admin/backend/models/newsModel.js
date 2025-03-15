const {model, Schema} = require('mongoose')

const newsSchema = new Schema({
    writerId: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'authors'
    },
    WriterName: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required:true
    },
    slug: {
        type: String,
        required:true
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required:true
    },
    description: {
        type: String,
        default:""
    },
    date: {
        type: String,
        required:true
    },
    status: {
        type: String,
        default:'pending'
    }, 
    count: {
        type: Number,
        default:'0'
    }, 
}, {timestamps: true})

newsSchema.index({
    title: 'text',
    category: 'text',
    description: 'text'
}, {
    title: 5,
    description: 4,
    category: 2
})

module.exports = model('news', newsSchema)