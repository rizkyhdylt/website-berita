const historyModel = require('../models/historyModul');

class historyController {
    saveClickHistory = async (req, res) => {
        const userId = req.userInfo.id;
        const { beritaId } = req.body;

        if (!beritaId) {
            return res.status(400).json({ message: 'Berita ID wajib diisi' });
        }

        try {
            await historyModel.findOneAndUpdate(
                { userId },
                {
                $push: {
                    clicks: {
                    $each: [{ beritaId, clickedAt: new Date() }],
                    $position: 0,    // Klik terbaru di depan
                    $slice: 5        // Batasi hanya 5 klik terakhir
                    }
                }
                },
                { upsert: true, new: true }
            );
            res.status(200).json({ message: 'Klik disimpan' });
        } catch (err) {
            console.error('❌ Gagal simpan history:', err.message);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    }

    getClickHistory = async (req, res) => {
        const userId = req.userInfo.id;

        try {
            const history = await historyModel.find({ userId }).sort({ clickedAt: -1 });
            res.status(200).json(history);
        } catch (err) {
            console.error('❌ Gagal ambil history:', err.message);
            res.status(500).json({ message: 'Gagal mengambil history klik' });
        }
    }
};

module.exports = new historyController();
