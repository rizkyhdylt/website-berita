const natural = require('natural');
const cosineSimilarity = require('cosine-similarity');
const ClickHistory = require('../models/historyModul');
const Like = require('../models/likeModels');
const News = require('../models/newsModel');
const Recommendation = require('../models/recomenModels'); // jika ingin menyimpan hasil rekomendasi

class RecommendationController {
  async getRecommendations(req, res) {
    try {
      const userId = req.userInfo.id;

      // 1) Ambil histori klik dan like user
      const clicks = await ClickHistory.find({ userId });
      const likes = await Like.find({ userId, action: 'like' });

      if (clicks.length === 0 && likes.length === 0) {
        return res.status(200).json({ data: [] });
      }

      // 2) Ambil berita yang pernah di-klik dan di-like
      const historyNews = await News.find({
        _id: {
          $in: [
            ...clicks.map(c => c.targetId),
            ...likes.map(l => l.targetId)
          ]
        }
      });

      // 3) Buat user profile text gabungan
      const userProfileText = historyNews.map(n => `${n.title} ${n.description}`).join(' ');

      // 4) Ambil semua berita untuk direkomendasikan
      const allNews = await News.find().limit(100);

      // 5) Buat corpus: semua berita + user profile sebagai dokumen terakhir
      const corpus = allNews.map(n => `${n.title} ${n.description}`);
      corpus.push(userProfileText); // index terakhir = profil user

      // 6) TF-IDF processing
      const tfidf = new natural.TfIdf();
      corpus.forEach(doc => tfidf.addDocument(doc));
      const userProfileIndex = corpus.length - 1;

      // 7) Hitung cosine similarity antara userProfile dan semua berita
      const recommendations = [];

      for (let i = 0; i < allNews.length; i++) {
        const docVector = [];
        const profileVector = [];

        tfidf.listTerms(i).forEach(term => {
          docVector.push(term.tfidf);
          const userTerm = tfidf.tfidf(term.term, userProfileIndex);
          profileVector.push(userTerm);
        });

        // Jika profileVector belum sepanjang docVector, isi nol
        while (profileVector.length < docVector.length) {
          profileVector.push(0);
        }

        const similarity = cosineSimilarity(docVector, profileVector);
        recommendations.push({
          news: allNews[i],
          similarity
        });
      }

      // 8) Urutkan berdasarkan similarity tertinggi
      recommendations.sort((a, b) => b.similarity - a.similarity);
      const topRecommendations = recommendations.slice(0, 10).map(r => r.news);

      // 9) Simpan ke DB (optional)
      await Recommendation.findOneAndUpdate(
        { userId },
        {
          userId,
          $addToSet: {
            recommendedNews: { $each: topRecommendations.map(n => n._id) }
          },
          favoriteCategory: topRecommendations.length > 0 ? topRecommendations[0].category : null,
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );

      // 10) Log hasilnya ke console
      // console.log('=== TOP RECOMMENDATIONS ===');
      topRecommendations.forEach(r => {
        // console.log(r.title);
      });

      // 10.1) Deteksi kategori favorit dari histori
const categoryCount = {};

historyNews.forEach(news => {
  if (news.category) {
    if (!categoryCount[news.category]) {
      categoryCount[news.category] = 1;
    } else {
      categoryCount[news.category]++;
    }
  }
});

// Urutkan kategori berdasarkan jumlah
const sortedCategories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);

// Ambil kategori favorit (top 1 atau beberapa)
const favoriteCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : null;
// console.log('Kategori Favorit User:', favoriteCategory);

      // 11) Kirim ke frontend
      res.status(200).json({ data: topRecommendations, favoriteCategory });

    } catch (err) {
      console.error('Recommendation Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new RecommendationController();
