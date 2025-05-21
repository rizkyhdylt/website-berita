const authModels = require('../models/authModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 
class authControllers{
    login = async(req, res) => {
        const { email, password } = req.body

        if(!email){
            return res.status(404).json({ message: 'Please provide your email'})
        }
        if(!password){
            return res.status(401).json({ message: 'Please provide your password'})
        }

        try{
            const user = await authModels.findOne({ email }).select('+password')
            if(user){
                const match = await bcrypt.compare(password,user.password)
                if(match){
                    const obj = {
                        id: user.id,
                        name: user.name,
                        // category: user.category,
                        role: user.role 
                    }
                    const token = await jwt.sign(obj, process.env.secret,{
                        expiresIn: process.env.exp_time
                    })
                    return res.status(200).json({ message: 'Login Success', token})
                }else{
                    return res.status(404).json({ message: 'invalid password'})
                }
            }else{
                return res.status(404).json({ message: 'user not found'})
            }
        }catch (error){
            console.log(error)
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
        // if(!category){
        //     return res.status(404).json({ message: 'please provide category'})
        // }
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
          const user = await authModels.findById(req.userInfo.id).select('-password');
          if (!user) return res.status(404).json({ message: "User not found" });
      
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json({ message: 'Server error' });
        }
    }

    changePassword = async (req, res) => {
        const { old_password, new_password } = req.body
      
        try {
          const user = await authModels.findById(req.userInfo.id)
          if (!user) return res.status(404).json({ message: 'User tidak ditemukan' })
      
          const isMatch = await bcrypt.compare(old_password, user.password)
          if (!isMatch) return res.status(400).json({ message: 'Password lama salah' })
      
          const hashedPassword = await bcrypt.hash(new_password, 10)
      
          user.password = hashedPassword
          await user.save()
      
          return res.status(200).json({ message: 'Password berhasil diubah' })
        } catch (err) {
          console.error(err)
          return res.status(500).json({ message: 'Terjadi kesalahan server' })
        }
      }
}

module.exports = new authControllers()