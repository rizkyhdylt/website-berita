const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/middleware');
const adsController = require('../controllers/adsController');

router.post('/api/ads/add', auth, adsController.add_ads);
router.get('/api/ads/latest', auth, adsController.get_latest_ads);

module.exports = router;
