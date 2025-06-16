const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/middleware');
const adsController = require('../controllers/adsController');

router.post('/api/ads/add', auth, adsController.add_ads);
router.get('/api/ads/latest', auth, adsController.get_latest_ads);
router.get('/ads', auth, adsController.get_all_ads); // untuk GET semua iklan
router.put('/:id', auth, adsController.update_ad_image); // untuk edit iklan
router.delete('/api/ads/:id', auth, adsController.delete_ad); // untuk hapus iklan

module.exports = router;
