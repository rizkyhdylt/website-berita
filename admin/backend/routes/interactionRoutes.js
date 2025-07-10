const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const middleware = require('../middlewares/middleware');

router.post('/api/like', middleware.auth, interactionController.like);
router.post('/api/unlike', middleware.auth, interactionController.unlike);
router.post('/api/dislike', middleware.auth, interactionController.dislike);
router.post('/api/undislike', middleware.auth, interactionController.undislike);
router.get('/api/like/status', middleware.auth, interactionController.likeStatus);

module.exports = router;
