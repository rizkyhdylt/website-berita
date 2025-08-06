const { model, Schema } = require('mongoose');

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
    type: String
    // Tidak required untuk Google login
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
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // supaya tidak error jika null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: { 
    type: String 
  },

}, { timestamps: true });

module.exports = model('users', userSchema);
