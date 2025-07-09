const express = require('express');
const interactionController = require('../controllers/interactionController');
const middleware = require('../middlewares/middleware');
const router = express.Router();


router.post('/api/like', middleware.auth, interactionController.like);  
router.post('/api/delike', middleware.auth, interactionController.delike);
router.get('/api/like/status', middleware.auth, interactionController.likeStatus);

module.exports = router;