const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/api/register',  userController.registerUser);
router.get('/api/users', userController.getAllUsers);


module.exports = router;