const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const middleware = require('../middlewares/middleware');

router.get('/api/recommendations', middleware.auth, recommendationController.getRecommendations);

module.exports = router;
