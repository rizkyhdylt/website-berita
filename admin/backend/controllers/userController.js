const User = require('../models/userModels');
const Recomens = require('../models/recomenModels');
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

  getAllUsers = async (req, res) => {
  try {
    // Ambil semua user
    const users = await User.find().select("-password");

    // Ambil data rekomendasi dan gabungkan ke masing-masing user
    const recomens = await Recomens.find().select('userId favoriteCategory');

    const usersWithFavorite = users.map(user => {
      const recom = recomens.find(r => r.userId.toString() === user._id.toString());
      return {
        ...user._doc,
        favoriteCategory: recom?.favoriteCategory || null
      };
    });

    return res.status(200).json(usersWithFavorite);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;

      // Hapus user
      const deleted = await User.findByIdAndDelete(userId);

      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };


}

module.exports = new userController()