const Like = require('../models/likeModels');
const News = require('../models/newsModel');
const Comment = require('../models/commentModels');
const User = require('../models/userModels');
const Author = require('../models/authModels');
const Feedback = require('../models/feedbackModels');

class InteractionController {

  // ✅ LIKE
  like = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & type wajib diisi' });
    }

    try {
      // Upsert histori
      await Like.findOneAndUpdate(
        { userId, targetId, targetType },
        { action: 'like', createdAt: new Date() },
        { upsert: true, new: true }
      );

      const news = await News.findById(targetId);
      if (!news) return res.status(404).json({ message: 'Berita tidak ditemukan' });

      // Tambah like jika belum like
      if (!news.likedUsers.includes(userId)) {
        news.likedUsers.push(userId);
        news.likeCount += 1;
      }

      // Jika sebelumnya dislike, hapus dislike
      if (news.dislikedUsers.includes(userId)) {
        news.dislikedUsers.pull(userId);
        if (news.dislikeCount > 0) news.dislikeCount -= 1;
      }

      await news.save();

      res.status(200).json({ message: 'Berhasil like' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // ✅ UNLIKE
  unlike = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & type wajib diisi' });
    }

    try {
      await Like.findOneAndDelete({ userId, targetId, targetType, action: 'like' });

      const news = await News.findById(targetId);
      if (!news) return res.status(404).json({ message: 'Berita tidak ditemukan' });

      if (news.likedUsers.includes(userId)) {
        news.likedUsers.pull(userId);
        if (news.likeCount > 0) news.likeCount -= 1;
      }

      await news.save();

      res.status(200).json({ message: 'Berhasil unlike' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // ✅ DISLIKE
  dislike = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & type wajib diisi' });
    }

    try {
      await Like.findOneAndUpdate(
        { userId, targetId, targetType },
        { action: 'dislike', createdAt: new Date() },
        { upsert: true, new: true }
      );

      const news = await News.findById(targetId);
      if (!news) return res.status(404).json({ message: 'Berita tidak ditemukan' });

      if (!news.dislikedUsers.includes(userId)) {
        news.dislikedUsers.push(userId);
        news.dislikeCount += 1;
      }

      if (news.likedUsers.includes(userId)) {
        news.likedUsers.pull(userId);
        if (news.likeCount > 0) news.likeCount -= 1;
      }

      await news.save();

      res.status(200).json({ message: 'Berhasil dislike' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // ✅ UNDISLIKE
  undislike = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & type wajib diisi' });
    }

    try {
      await Like.findOneAndDelete({ userId, targetId, targetType, action: 'dislike' });

      const news = await News.findById(targetId);
      if (!news) return res.status(404).json({ message: 'Berita tidak ditemukan' });

      if (news.dislikedUsers.includes(userId)) {
        news.dislikedUsers.pull(userId);
        if (news.dislikeCount > 0) news.dislikeCount -= 1;
      }

      await news.save();

      res.status(200).json({ message: 'Berhasil undislike' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // STATUS
  likeStatus = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.query;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & Type wajib diisi' });
    }

    const exists = await Like.findOne({ userId, targetId, targetType });

    res.status(200).json({
      liked: exists?.action === 'like',
      disliked: exists?.action === 'dislike',
    });
  };

  // ADD COMMENT
  createComment = async (req, res) => {
  const { newsId, comment } = req.body;
  const userId = req.userInfo.id; 
   const userType = req.userInfo.role === 'user' ? 'user' : 'author';

  try {
    const newComment = new Comment({
      newsId,
      userId,
      userType,
      comment
    });

    await newComment.save();
    // Populate sesuai tipe user
      let populatedComment;
      if (userType === 'user') {
        populatedComment = await newComment.populate({ path: 'userId', model: User, select: 'name image' });
      } else {
        populatedComment = await newComment.populate({ path: 'userId', model: Author, select: 'name image' });
      }

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  // GET COMMENTS BY NEWS ID  
  getCommentsByNewsId = async (req, res) => {
  try {
      const comments = await Comment.find({ newsId: req.params.newsId });

      // Populate manual sesuai tipe user
      const populatedComments = await Promise.all(comments.map(async (comment) => {
        let userData = null;
        if (comment.userType === 'user') {
          userData = await User.findById(comment.userId).select('name image');
        } else {
          userData = await Author.findById(comment.userId).select('name image');
        }
        return {
          ...comment.toObject(),
          userId: userData
        };
      }));

      res.json(populatedComments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Gagal mengambil komentar' });
    }
  };

  //delete comment
  deleteComment = async (req, res) => {
  try {
    const userId = req.userInfo.id;         // ID user yang login (dari middleware auth)
    const userRole = req.userInfo.role;     // Role user yang login
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: 'Komentar tidak ditemukan' });

    // Hanya admin atau pemilik komentar yang boleh hapus
    if (userRole !== 'admin' && comment.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Tidak memiliki izin untuk menghapus komentar ini' });
    }

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: 'Komentar berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus komentar' });
  }
};

  // ✅ FEEDBACK
createFeedback = async (req, res) => {
  try {
    const { newsId, isRelevant } = req.body;
    const userId = req.userInfo.id; // dari middleware.auth

    console.log("✅ req.body:", req.body);
    console.log("✅ userId:", userId);
    // Cek apakah user sudah feedback untuk news ini
    const existingFeedback = await Feedback.findOne({ newsId, userId });
    if (existingFeedback) {
      return res.status(400).json({ message: "Kamu sudah memberikan feedback sebelumnya." });
    }

    const feedback = new Feedback({ newsId, userId, isRelevant });
    await feedback.save();

    res.status(201).json({ message: "Feedback berhasil disimpan" });
  } catch (error) {
    console.error("❌ Feedback error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

cheackFeedbackSummary = async (req, res) => {
   try {
    const { newsId } = req.query;
    const userId = req.userInfo.id;

    const feedback = await Feedback.findOne({ newsId, userId });
    res.status(200).json({ hasFeedback: !!feedback });
  } catch (error) {
    console.error('❌ Error cek feedback:', error.message);
    res.status(500).json({ message: 'Server error saat cek feedback' });
  }
};



}

module.exports = new InteractionController();
