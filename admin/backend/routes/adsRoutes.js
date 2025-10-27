const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/middleware');
const adsController = require('../controllers/adsController');

router.post('/api/ads/add', auth, adsController.add_ads);
router.get('/ads', auth, adsController.get_all_ads);
router.get('/api/ads/slot/:slot', adsController.get_latest_ads);
router.put('/api/ads/:id', auth, adsController.update_ad_image);    
router.delete('/api/ads/:id', auth, adsController.delete_ad);


module.exports = router;
