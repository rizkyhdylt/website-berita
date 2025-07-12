const natural = require('natural');
const cosineSimilarity = require('cosine-similarity');
const ClickHistory = require('../models/historyModul');
const Like = require('../models/likeModels');
const News = require('../models/newsModel');

class RecommendationController {
  async getRecommendations(req, res) {
    const userId = req.userInfo.id;

    try {
      // 1) Ambil histori user
      const clicks = await ClickHistory.find({ userId });
      const likes = await Like.find({ userId, action: 'like' });

      if (clicks.length === 0 && likes.length === 0) {
        return res.status(200).json({ data: [] });
      }

      // 2) Ambil berita yang di-klik/like
      const historyNews = await News.find({
        _id: {
          $in: [
            ...clicks.map(c => c.targetId),
            ...likes.map(l => l.targetId)
          ]
        }
      });

      // 3) Gabungkan text-nya jadi profil user
      const userProfileText = historyNews.map(n => `${n.title} ${n.description}`).join(' ');

      // 4) Ambil semua berita terbaru
      const allNews = await News.find().limit(100);

      // 5) Buat corpus
      const corpus = allNews.map(n => `${n.title} ${n.description}`);
      corpus.push(userProfileText); // user profile = doc ke-N

      // 6) TF-IDF
      const tfidf = new natural.TfIdf();
      corpus.forEach(doc => tfidf.addDocument(doc));

      const userProfileIndex = corpus.length - 1;

      const recommendations = [];

      // 7) Hitung cosine similarity
      for (let i = 0; i < allNews.length; i++) {
        const docVector = []; // Vektor untuk dokumen berita
        const profileVector = []; // Vektor untuk profil user

        tfidf.listTerms(i).forEach(term => {
          docVector.push(term.tfidf);
          const userTerm = tfidf.tfidf(term.term, userProfileIndex);
          profileVector.push(userTerm);
        });

        // Pastikan vektor sama panjang
        while (profileVector.length < docVector.length) {
          profileVector.push(0);
        }

        const similarity = cosineSimilarity(docVector, profileVector);
        recommendations.push({
          news: allNews[i],
          similarity
        });
      }

      // 8) Urutkan & kirim
      recommendations.sort((a,b) => b.similarity - a.similarity);
      const topRecommendations = recommendations.slice(0, 6).map(r => r.news);

      console.log('=== TOP RECOMMENDATIONS ===')
      topRecommendations.forEach(r => {
        console.log(r.title);
      });

      res.status(200).json({ data: topRecommendations });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new RecommendationController();
