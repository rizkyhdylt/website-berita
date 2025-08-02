const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/api/register',  userController.registerUser);
router.get('/api/users', userController.getAllUsers);
router.delete('/api/users/:id', userController.deleteUser);


module.exports = router;