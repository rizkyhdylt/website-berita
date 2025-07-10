const Like = require('../models/likeModels');
const News = require('../models/newsModel');

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
}

module.exports = new InteractionController();
