const User = require('../models/userModels');
const Recomens = require('../models/recomenModels');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');


class userController{
    registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

    const verificationToken = crypto.randomBytes(20).toString('hex');

    const user = new User({
      name,
      email,
      password,
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
      return res.redirect('http://localhost:5000/email-verification-failed');
    }

    if (user.isVerified) {
      return res.redirect('http://localhost:5000/email-already-verified');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.redirect('http://localhost:5173/email-verification-success');
  } catch (error) {
    console.error('Verify error:', error);
    return res.redirect('http://localhost:5173/email-verification-failed');
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

  forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

  const resetToken = user.generateResetToken();
  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const message = `
    <h1>Reset Password</h1>
    <p>Silakan klik link di bawah ini untuk reset password:</p>
    <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    <p>Link ini akan kedaluwarsa dalam 10 menit.</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      message: message
    });

    console.log("Kirim ke:", user.email);
    console.log("Message:", message);

    res.status(200).json({ message: "Email reset password telah dikirim" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.error("Email gagal dikirim:", error);
    return res.status(500).json({ message: "Email gagal dikirim" });
  }
};

resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log('Token:', req.params.token);
console.log('Password:', req.body.password);

  if (!password) {
    return res.status(400).json({ message: "Password tidak boleh kosong" });
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Token tidak valid atau sudah kedaluwarsa" });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password berhasil direset" });
};


}

module.exports = new userController()