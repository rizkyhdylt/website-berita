const { model, Schema } = require('mongoose');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpire: {
    type: Date
  },
  provider: {
  type: String,
  enum: ['manual', 'google'],
  default: 'manual'
},

}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};


module.exports = model('users', userSchema);
