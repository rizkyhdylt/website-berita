const ClickHistory = require('../models/historyModul');
const Like = require('../models/likeModels');
const News = require('../models/newsModel');

class RecommendationController {
  async getRecommendations(req, res) {
    const userId = req.userInfo.id;

    try {
      // Ambil histori klik, like, dislike
      const clicks = await ClickHistory.find({ userId });
      const likes = await Like.find({ userId, action: 'like' });
      const dislikes = await Like.find({ userId, action: 'dislike' });

      // Hitung bobot kategori
      const categoryCounter = {};

      for (const click of clicks) {
        const news = await News.findById(click.targetId);
        if (news) {
          categoryCounter[news.category] = (categoryCounter[news.category] || 0) + 1;
        }
      }

      for (const like of likes) {
        const news = await News.findById(like.targetId);
        if (news) {
          categoryCounter[news.category] = (categoryCounter[news.category] || 0) + 3; // like bobot 3
        }
      }

      for (const dislike of dislikes) {
        const news = await News.findById(dislike.targetId);
        if (news) {
          categoryCounter[news.category] = (categoryCounter[news.category] || 0) - 2; // dislike bobot -2
        }
      }

      // Urutkan kategori berdasarkan skor bobot tertinggi
      const sortedCategories = Object.entries(categoryCounter)
        .sort((a, b) => b[1] - a[1])
        .map(([cat]) => cat)
        .slice(0, 3); // Ambil top 3 kategori

      // console.log('Kategori teratas:', sortedCategories);

      // Hindari news yang sudah diklik/like/dislike
      const seenNewsIds = clicks.map(c => c.targetId)
        .concat(likes.map(l => l.targetId))
        .concat(dislikes.map(d => d.targetId));

      const recommendations = await News.find({
        category: { $in: sortedCategories },
        _id: { $nin: seenNewsIds }
      }).limit(6); //rekomendasi maksimal 6 berita

      // console.log('Hasil rekomendasi:', recommendations);

      res.status(200).json({ data: recommendations });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new RecommendationController();
