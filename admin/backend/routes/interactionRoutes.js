const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const middleware = require('../middlewares/middleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/api/like', middleware.auth, interactionController.like);
router.post('/api/unlike', middleware.auth, interactionController.unlike);
router.post('/api/dislike', middleware.auth, interactionController.dislike);
router.post('/api/undislike', middleware.auth, interactionController.undislike);
router.get('/api/like/status', middleware.auth, interactionController.likeStatus);
router.post('/api/comments', middleware.auth, interactionController.createComment);
router.get('/api/comments/:newsId', interactionController.getCommentsByNewsId);
router.delete('/api/comment/:commentId', middleware.auth, interactionController.deleteComment);

router.post('/api/feedback', middleware.auth, interactionController.createFeedback);
router.get('/api/feedback/check', middleware.auth, interactionController.cheackFeedback);
router.get('/api/feedback/summary', interactionController.feedbackSummary);

router.post('/api/opini',middleware.auth,interactionController.tambahOpini);
router.patch('/api/opini/:id/read', middleware.auth, interactionController.readOpini);
router.get('/api/opini/unread', middleware.auth, interactionController.unreadOpini);
router.get('/api/opini/list', middleware.auth, interactionController.listOpini) ;
router.get('/api/opini/:id', middleware.auth, interactionController.viewOpini);


module.exports = router;
