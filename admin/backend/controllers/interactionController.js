const Like = require('../models/likeModels'); 

class interactionController {
  
    like = async (req, res) => {
        const userId = req.userInfo.id;
        const { targetId, targetType } = req.body;

        if (!targetId || !targetType) {
            return res.status(400).json({ message: 'Target ID & target type wajib diisi' });
        }

        try {
            const exists = await Like.findOne({ userId, targetId, targetType });
            if (exists) {
            return res.status(400).json({ message: 'Sudah di-like' });
            }

            const like = new Like({ userId, targetId, targetType });
            await like.save();
            res.status(201).json({ message: 'Berhasil like', data: like });
        } catch (err) {
            console.error('❌ Gagal like:', err.message);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    unlike = async (req, res) => {
        const userId = req.userInfo.id;
        const { targetId, targetType } = req.body;

        if (!targetId || !targetType) {
            return res.status(400).json({ message: 'Target ID & target type wajib diisi' });
        }

        try {
            const deleted = await Like.findOneAndDelete({ userId, targetId, targetType });

            if (!deleted) {
            return res.status(404).json({ message: 'Like tidak ditemukan' });
            }

            res.status(200).json({ message: 'Berhasil delike' });
        } catch (err) {
            console.error('❌ Gagal delike:', err.message);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    likeStatus = async (req, res) => {
  const userId = req.userInfo.id;
  const { targetId, targetType } = req.query;

  if (!targetId || !targetType) {
    return res.status(400).json({ message: 'Target ID & Type wajib diisi' });
  }

  const exists = await Like.findOne({ userId, targetId, targetType });

  res.status(200).json({ liked: !!exists });
};

}

module.exports = new interactionController();