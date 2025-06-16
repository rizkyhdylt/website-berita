const AdsModel = require('../models/adsModels');
const { IncomingForm } = require('formidable');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

class AdsController {
    add_ads = async (req, res) => {
        const form = new IncomingForm({ keepExtensions: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return res.status(500).json({ message: 'Error parsing form data', error: err.message });
            }

            const file = files.image?.[0] || files.image;

            if (!file || !file.filepath) {
                return res.status(400).json({ message: 'No image uploaded or file path missing' });
            }

            try {
                const result = await cloudinary.uploader.upload(file.filepath, {
                    folder: 'ads_image',
                });

                const newAd = new AdsModel({ image: result.secure_url });
                await newAd.save();

                return res.status(201).json({
                    message: 'Iklan berhasil ditambahkan',
                    image: result.secure_url
                });
            } catch (error) {
                console.error('Upload error:', error);
                return res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });
    };

    get_latest_ads = async (req, res) => {
        try {
            const latestAd = await AdsModel.findOne().sort({ createdAt: -1 });

            if (!latestAd) {
                return res.status(404).json({ message: 'Tidak ada iklan ditemukan' });
            }

            return res.json({ image: latestAd.image });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    };

    // Ambil semua iklan
    get_all_ads = async (req, res) => {
        try {
            const ads = await AdsModel.find().sort({ createdAt: -1 });
            res.json({ ads });
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data iklan', error: error.message });
        }
    };

    
    // Update gambar iklan
    update_ad_image = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'Image URL is required.' });
    }

    const ad = await Ads.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );

    if (!ad) {
      return res.status(404).json({ message: 'Iklan tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Iklan berhasil diperbarui.', ad });
  } catch (error) {
    console.error('Error saat update image:', error.message);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};

    // Hapus iklan
   delete_ad = async (req, res) => {
        try {
            const ad = await AdsModel.findById(req.params.id);
            if (!ad) {
                return res.status(404).json({ message: 'Iklan tidak ditemukan' });
            }

            // Ambil public_id Cloudinary dari URL
            const imageUrl = ad.image;
            const regex = /\/ads_image\/([^\.\/]+)\./;
            const match = imageUrl.match(regex);

            if (match && match[1]) {
                const publicId = `ads_image/${match[1]}`;
                await cloudinary.uploader.destroy(publicId);
            } else {
                console.warn('Gagal mengidentifikasi public_id dari URL:', imageUrl);
            }

            // Hapus dari database
            await AdsModel.findByIdAndDelete(req.params.id);

            res.json({ message: 'Iklan berhasil dihapus' });
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({ message: 'Gagal menghapus iklan', error: error.message });
        }
    };

}

module.exports = new AdsController();
