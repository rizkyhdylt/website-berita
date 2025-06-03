const User = require('../models/userModels');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class userController{
    registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // Hash password jika perlu
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'Register successful' });
  } catch (err) {
    console.error(err); // Tambahkan ini untuk melihat error detail di terminal
    return res.status(500).json({ message: 'Server error' });
  }
};
}

module.exports = new userController()