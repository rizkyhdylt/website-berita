const authModels = require('../models/authModels')
const userModels = require('../models/userModels')
const News = require('../models/newsModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2 
const fs = require('fs')

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

class authControllers{
    
    login = async (req, res) => {
        const { email, password } = req.body;
        if (!email) {
            return res.status(404).json({ message: 'Please provide your email' });
        }
        if (!password) {
            return res.status(401).json({ message: 'Please provide your password' });
        }
        try {
            // Cek di authModels (admin/writer)
            let user = await authModels.findOne({ email }).select('+password');
            // Jika tidak ditemukan, cek di userModels (user biasa)
            if (!user) {
                user = await userModels.findOne({ email }).select('+password');
            }
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const obj = {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                        image: user.image ,
                        
                    };
                    const token = await jwt.sign(obj, process.env.secret, {
                        expiresIn: process.env.exp_time
                    });
                    return res.status(200).json({ message: 'Login Success', token });
                } else {
                    return res.status(404).json({ message: 'invalid password' });
                }
            } else {
                return res.status(404).json({ message: 'user not found' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    
    add_writer = async(req, res) => {
        const {email, name, password,} = req.body
        if(!name){
            return res.status(404).json({ message: 'please provide name'})
        }
        if(!password){
            return res.status(404).json({ message: 'please provide password'})
        }
        if(!email){
            return res.status(404).json({ message: 'please provide email'})
        }
        if(email && !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/))
        {
            return res.status(404).json({ message: 'please provide valied email'})
        }
        try{
            const writer = await authModels.findOne({ email: email.trim() }) 
            if (writer){
                return res.status(404).json({ message: 'user alreasy exit'})
            }else{  
                const new_writer = await authModels.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password.trim(), 10),
                    // category: category.trim(),
                    role: 'writer'
                })
                return res.status(201).json({ message: 'writer add success', writer: new_writer})
            }
        }catch (error){
            return res.status(500).json({ message: 'internet server error',})
        }
    }

    get_writers = async (req, res ) => {
        try{
            const writers = await authModels.find({ role: "writer"}).sort({ createdAt: -1})
            return res.status(200).json({ writers }) 
        }catch(error){
            return res.status(500).json({ message:'internet server error' })
        }
    }

    getProfile = async (req, res) => {
        try {
          let user = await authModels.findById(req.userInfo.id).select('-password');
          
          if(!user) {
            user = await userModels.findById(req.userInfo.id).select('-password');
          }

          if (!user) return res.status(404).json({ message: "User not found" });
        
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json({ message: 'Server error' });
        }
    }

    changePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const userId = req.userInfo.id; // pastikan middleware auth menambahkan req.user

        // Ambil user dari DB termasuk password-nya
        let user = await authModels.findById(userId).select('+password');
        
        if(!user){
            user = await userModels.findById(userId).select('+password');
        }


        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        // Bandingkan password lama
        const isMatch = await bcrypt.compare(old_password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password lama salah' });
        }

        // Hash password baru
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);

        // Simpan password baru
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password berhasil diubah' });
        } catch (error) {
            console.error('Gagal ubah password:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    };

   uploadImage = async (req, res) => {
    try {
        const { id } = req.userInfo;
        let user = await authModels.findById(id);
        if (!user) {
            user = await userModels.findById(id);
        }
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        // Jika ada image lama di Cloudinary, hapus dulu
        if (user.image_public_id) {
        await cloudinary.uploader.destroy(user.image_public_id);
        }

        // Upload gambar baru
        const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_image',
        transformation: [{ width: 300, height: 300, crop: 'limit' }],
        });

        // Simpan image baru ke database
        user.image = result.secure_url;
        user.image_public_id = result.public_id;
        await user.save();

        // Hapus file lokal
        const fs = require('fs');
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'Image uploaded successfully', image: user.image });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Server error' });
    }
    };

    // Get writer detail only
  getWriterById = async (req, res) => {
    try {
      const writer = await authModels.findById(req.params.id).select('-password');
      if (!writer) {
        return res.status(404).json({ message: 'Writer not found' });
      }
      res.status(200).json({ writer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Get writer detail + news
  getWriterWithNews = async (req, res) => {
    try {
      const writerId = req.params.id;
      const writer = await authModels.findById(writerId).select('-password');
      if (!writer) {
        return res.status(404).json({ message: 'Writer not found' });
      }

      const news = await News.find({ writerId }).sort({ createdAt: -1 });
      res.status(200).json({ writer, news });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  deleteWriter = async (req, res) => {
  try {
    const writer = await authModels.findById(req.params.id);
    if (!writer) {
      return res.status(404).json({ message: 'Writer not found' });
    }

    await writer.deleteOne();
    res.status(200).json({ message: 'Writer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
}

module.exports = new authControllers()