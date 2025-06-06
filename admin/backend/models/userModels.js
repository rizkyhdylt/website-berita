const {model, Schema} = require('mongoose')

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'user' 
  },
  image: {
        type: String,
        default: ""
    },
  image_public_id: {
      type: String
  }

}, { timestamps: true });

module.exports = model('users', userSchema);
