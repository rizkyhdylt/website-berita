const User = require('../models/userModels');
const Recomens = require('../models/recomenModels');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const crypto = require('crypto');


class userController{
    registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString('hex');

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    await user.save();

    const verificationLink = `http://localhost:5000/api/verify/${verificationToken}`;
    console.log('Verification link:', verificationLink);
    await sendVerificationEmail(email, 'Verifikasi Email', `Klik link berikut untuk verifikasi akun Anda: ${verificationLink}`);

    res.status(201).json({ message: 'Registrasi berhasil, cek email untuk verifikasi' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


  // VERIFIKASI TOKEN DARI EMAIL
  verifyToken = async (req, res) => {
     const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Token tidak valid atau user tidak ditemukan' });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: 'Email sudah diverifikasi sebelumnya' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({ message: 'Email berhasil diverifikasi' });
  } catch (error) {
    console.error('Verify error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
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