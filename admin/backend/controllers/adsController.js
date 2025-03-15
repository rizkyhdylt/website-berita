const AdsModel = require('../models/adsModels'); // Model yang sudah diperbaiki
const { formidable } = require('formidable');
const cloudinary = require('cloudinary').v2;

class AdsController {
    add_ads = async (req, res) => {
        const form = formidable({ multiples: false });

        // Konfigurasi Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ message: 'Error parsing form data' });
            }

            if (!files.image) {
                return res.status(400).json({ message: 'No image uploaded' });
            }

            try {
                // Upload gambar ke Cloudinary
                const result = await cloudinary.uploader.upload(files.image.filepath, {
                    folder: 'ads_image',
                });

                // Simpan URL gambar ke database dalam koleksi "ads"
                const newAd = new AdsModel({ image: result.secure_url });
                await newAd.save();

                return res.status(201).json({ 
                    message: 'Iklan berhasil ditambahkan', 
                    image: result.secure_url 
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    };

    get_latest_ads = async (req, res) => {
        try {
            const latestAd = await AdsModel.findOne().sort({ createdAt: -1 });

            if (!latestAd) {
                return res.status(404).json({ message: 'Tidak ada iklan ditemukan' });
            }

            return res.json({ image: latestAd.image});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    };
}

module.exports = new AdsController();
