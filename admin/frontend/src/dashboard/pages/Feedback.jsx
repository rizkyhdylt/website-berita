import React, { useEffect, useState } from 'react';
import { base_url } from '../../config/config';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalFeedback: 0,
    relevantFeedback: 0,
    relevancePercentage: 0,
  });

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const res = await fetch(`${base_url}/api/feedback/summary`);
        const data = await res.json();

        if (res.ok) {
          setFeedbackList(data.feedbackPerNews || []);

          const totalFeedback = data.feedbackPerNews.reduce((sum, news) => sum + news.total, 0);
          const totalRelevant = data.feedbackPerNews.reduce((sum, news) => sum + news.relevant, 0);
          const percentage = totalFeedback === 0 ? 0 : ((totalRelevant / totalFeedback) * 100).toFixed(2);

          setOverallStats({
            totalFeedback,
            relevantFeedback: totalRelevant,
            relevancePercentage: percentage,
          });
        }
      } catch (err) {
        console.error('❌ Gagal mengambil data feedback:', err);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <div className='bg-white p-6 rounded-md'>
      <h2 className='text-xl font-semibold mb-4'>User Feedback Summary</h2>

      <div className="overflow-x-auto mb-4">
        <table className="table-auto w-full border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">News ID</th>
              <th className="border px-4 py-2">Judul Berita</th>
              <th className="border px-4 py-2">Total Feedback</th>
              <th className="border px-4 py-2">Relevan</th>
              <th className="border px-4 py-2">Persentase</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((item) => (
              <tr key={item.newsId}>
                <td className="border px-4 py-2">{item.newsId}</td>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.total}</td>
                <td className="border px-4 py-2">{item.relevant}</td>
                <td className="border px-4 py-2 text-green-700 font-medium">
                  {item.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p><strong>Total Feedback Semua Berita:</strong> {overallStats.totalFeedback}</p>
        <p><strong>Total Relevan:</strong> {overallStats.relevantFeedback}</p>
        <p className="text-green-700 font-semibold">
          <strong>Rata-rata Persentase Relevansi Keseluruhan:</strong> {overallStats.relevancePercentage}%
        </p>
      </div>
    </div>
  );
};

export default Feedback;
