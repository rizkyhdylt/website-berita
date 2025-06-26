const express = require('express');
const middleware = require('../middlewares/middleware')
const historyController = require('../controllers/historyController');

const router = express.Router();

router.post('/click-history', middleware.auth, historyController.saveClickHistory);
router.get('/click-history/:userId', middleware.auth, historyController.getClickHistory);

module.exports = router;