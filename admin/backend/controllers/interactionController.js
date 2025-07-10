const Like = require('../models/likeModels');

class InteractionController {

  // LIKE: simpan atau update jadi LIKE
  like = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & target type wajib diisi' });
    }

    try {
      const interaction = await Like.findOneAndUpdate(
        { userId, targetId, targetType },
        { action: 'like', createdAt: new Date() },
        { upsert: true, new: true }
      );

      res.status(200).json({ message: 'Berhasil like', data: interaction });
    } catch (err) {
      console.error('❌ Gagal like:', err.message);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  };

  // UNLIKE: hapus kalau action-nya LIKE
  unlike = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & target type wajib diisi' });
    }

    try {
      const deleted = await Like.findOneAndDelete({
        userId,
        targetId,
        targetType,
        action: 'like',
      });

      if (!deleted) {
        return res.status(404).json({ message: 'Like tidak ditemukan' });
      }

      res.status(200).json({ message: 'Berhasil unlike' });
    } catch (err) {
      console.error('❌ Gagal unlike:', err.message);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  };

  // DISLIKE: simpan atau update jadi DISLIKE
  dislike = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & target type wajib diisi' });
    }

    try {
      const interaction = await Like.findOneAndUpdate(
        { userId, targetId, targetType },
        { action: 'dislike', createdAt: new Date() },
        { upsert: true, new: true }
      );

      res.status(200).json({ message: 'Berhasil dislike', data: interaction });
    } catch (err) {
      console.error('❌ Gagal dislike:', err.message);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  };

  // UNDISLIKE: hapus kalau action-nya DISLIKE
  undislike = async (req, res) => {
    const userId = req.userInfo.id;
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ message: 'Target ID & target type wajib diisi' });
    }

    try {
      const deleted = await Like.findOneAndDelete({
        userId,
        targetId,
        targetType,
        action: 'dislike',
      });

      if (!deleted) {
        return res.status(404).json({ message: 'Dislike tidak ditemukan' });
      }

      res.status(200).json({ message: 'Berhasil undislike' });
    } catch (err) {
      console.error('❌ Gagal undislike:', err.message);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  };

  // STATUS: return liked/disliked status
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
