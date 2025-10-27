const Like = require('../models/likeModels');
const News = require('../models/newsModel');
const Comment = require('../models/commentModels');
const User = require('../models/userModels');
const Author = require('../models/authModels');
const Feedback = require('../models/feedbackModels');
const cloudinary = require('cloudinary').v2;
const opiniModels = require('../models/opiniModels');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

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

    // console.log("✅ req.body:", req.body);
    // console.log("✅ userId:", userId);
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

cheackFeedback = async (req, res) => {
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

getFeedbackSummary = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const relevantFeedback = await Feedback.countDocuments({ isRelevant: true });

    res.status(200).json({
      totalFeedback,
      relevantFeedback
    });
  } catch (error) {
    console.error('❌ Error mengambil summary feedback:', error.message);
    res.status(500).json({ message: 'Gagal mengambil summary feedback' });
  }
};

feedbackSummary = async (req, res) => {
  try {
    // Ambil semua feedback, dan kelompokkan berdasarkan newsId
    const feedbacks = await Feedback.aggregate([
      {
        $group: {
          _id: '$newsId',
          total: { $sum: 1 },
          relevant: {
            $sum: {
              $cond: [{ $eq: ['$isRelevant', true] }, 1, 0]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'news', // nama koleksi di MongoDB
          localField: '_id',
          foreignField: '_id',
          as: 'news'
        }
      },
      {
        $unwind: '$news'
      },
      {
        $project: {
          newsId: '$_id',
          title: '$news.title',
          total: 1,
          relevant: 1,
          percentage: {
            $cond: [
              { $eq: ['$total', 0] },
              0,
              {
                $round: [{ $multiply: [{ $divide: ['$relevant', '$total'] }, 100] }, 2]
              }
            ]
          }
        }
      }
    ]);

    res.status(200).json({
      feedbackPerNews: feedbacks
    });

  } catch (error) {
    console.error('❌ Error saat ambil feedback summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Di file interactionController.js Anda
tambahOpini = async (req, res) => {
    let fotoUrl = null;
    let resourceType = 'image'; 
    let mimeType = '';
    let fileExtension = '';

    if (req.body.foto) {
        // 1. Ekstrak MIME Type dan Ekstensi dari header Base64
        const mimeMatch = req.body.foto.match(/^data:(.*);base64,/);
        
        if (mimeMatch && mimeMatch[1]) {
            mimeType = mimeMatch[1];
            
            // Logika untuk menentukan ekstensi dan resource type
            if (mimeType.includes('pdf')) {
                fileExtension = 'pdf';
                resourceType = 'raw';
            } else if (mimeType.includes('wordprocessingml')) {
                fileExtension = 'docx';
                resourceType = 'raw';
            } else if (mimeType.includes('msword')) {
                fileExtension = 'doc';
                resourceType = 'raw';
            } else if (mimeType.startsWith('image/')) {
                // Untuk gambar, ekstensi adalah bagian setelah slash (e.g., image/png -> png)
                fileExtension = mimeType.split('/')[1]; 
                resourceType = 'image';
            } else {
                // Default untuk tipe file yang tidak dikenal
                fileExtension = 'dat'; 
                resourceType = 'raw';
            }
        }
    }

    if (req.body.foto) {
        try {
            console.log(`Menerima data. Resource Type: ${resourceType}, Ext: ${fileExtension}`);

            // 2. Buat Public ID dengan nama file yang jelas dan ekstensi yang benar
            const baseFileName = req.body.judul.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
            const publicIdWithExt = `opini_images/${baseFileName}_${Date.now()}.${fileExtension}`; 

            const uploadRes = await cloudinary.uploader.upload(req.body.foto, {
                folder: "opini_images",
                resource_type: resourceType,
                // 💡 PERBAIKAN: Set Public ID secara eksplisit dengan ekstensi
                public_id: publicIdWithExt, 
                overwrite: true,
                // Parameter format memastikan URL output memiliki ekstensi yang benar (meskipun untuk raw tidak wajib)
                format: fileExtension, 
            });
            fotoUrl = uploadRes.secure_url;

        } catch (cloudinaryErr) {
            console.error("❌ CLOUDINARY UPLOAD FAILED:", cloudinaryErr.message);
            return res.status(500).json({ 
                message: "Gagal mengunggah file. Pastikan konfigurasi Cloudinary benar.", 
                error: cloudinaryErr.message 
            });
        }
    }

    // Blok try...catch untuk proses penyimpanan ke database
    try {
        const opini = new opiniModels({
            userId: req.userInfo.id,
            nama: req.body.nama,
            email: req.body.email,
            noHp: req.body.noHp,
            judul: req.body.judul,
            isi: req.body.isi,
            kategori: req.body.kategori,
            foto: fotoUrl,
            type: req.body.type || "opini",
        });

        await opini.save();
        res.status(201).json({ message: "Opini berhasil dikirim", data: opini });
        
    } catch (dbErr) {
        console.error("❌ DATABASE SAVE FAILED:", dbErr.message);
        res.status(500).json({ 
            message: "Gagal menyimpan opini ke database. Cek model atau data input.", 
            error: dbErr.message 
        });
    }
};

tambahLaporan = async (req, res) => {
  try {
    let fotoUrl = null;
    if (req.body.foto) {
      const uploadRes = await cloudinary.uploader.upload(req.body.foto, {
        folder: "laporan_images",
      });
      fotoUrl = uploadRes.secure_url;
    }

    const laporan = new opiniModels({
      userId: req.userInfo.id,
      nama: req.body.nama,
      email: req.body.email,
      noHp: req.body.noHp,
      judul: req.body.judul,
      isi: req.body.isi,
      kategori: req.body.kategori,
      foto: fotoUrl,
      type: "laporan", // 👈 langsung fix type
    });

    await laporan.save();
    res.status(201).json({ message: "Laporan berhasil dikirim", data: laporan });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengirim laporan", error: err.message });
  }
};


readOpini = async (req, res) => {
  try {
    await opiniModels.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: 'Opini ditandai sudah dibaca' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

unreadOpini = async (req, res) => {
  try {
    const unreadOpini = await opiniModels.find({ read: false }).sort({ createdAt: -1 });
    res.json(unreadOpini);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data opini unread' });
  }
}

listOpini = async (req, res) => {
 try {
    const opiniList = await opiniModels.find().sort({ createdAt: -1 });
    res.json(opiniList);
  } catch (error) {
    console.error("Error get opini list:", error);
    res.status(500).json({ message: "Gagal mengambil data opini" });
  }
};

viewOpini = async (req, res) => {
   try {
    const opini = await opiniModels.findById(req.params.id);
    if (!opini) {
      return res.status(404).json({ message: 'Opini tidak ditemukan' });
    }
    res.json(opini);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

listByType = async (req, res) => {
  try {
    const { type } = req.params;
    const list = await opiniModels.find({ type }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data opini/laporan", error: err.message });
  }
};

}

module.exports = new InteractionController();
