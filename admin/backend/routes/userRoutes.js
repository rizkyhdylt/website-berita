const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/api/register',  userController.registerUser);
router.get('/api/verify/:token', userController.verifyToken);
router.get('/api/users', userController.getAllUsers);
router.delete('/api/users/:id', userController.deleteUser);

router.post('/api/forgot-password', userController.forgotPassword);
router.post('/api/reset-password/:token', userController.resetPassword);



module.exports = router;