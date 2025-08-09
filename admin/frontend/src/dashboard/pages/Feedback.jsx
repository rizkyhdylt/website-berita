import React, { useEffect, useState } from 'react';
import { base_url } from '../../config/config';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaChartPie, FaListUl, FaThumbsUp } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

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

  // Data Chart
  const chartData = {
    labels: ['Relevan', 'Tidak Relevan'],
    datasets: [
      {
        data: [
          overallStats.relevantFeedback,
          overallStats.totalFeedback - overallStats.relevantFeedback,
        ],
        backgroundColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaChartPie className="text-indigo-500" /> User Feedback Dashboard
      </h2>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition">
          <FaListUl className="text-3xl text-indigo-500" />
          <div>
            <p className="text-gray-500">Total Feedback</p>
            <p className="text-2xl font-bold">{overallStats.totalFeedback}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition">
          <FaThumbsUp className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-500">Total Relevan</p>
            <p className="text-2xl font-bold">{overallStats.relevantFeedback}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition">
          <FaChartPie className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-500">Persentase Relevansi</p>
            <p className="text-2xl font-bold text-purple-600">
              {overallStats.relevancePercentage}%
            </p>
          </div>
        </div>
      </div>
      {/* Diagram & Tabel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tabel Feedback */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Detail Feedback per Berita</h3>
          <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 sticky top-0">
                  <th className="border px-4 py-2">News ID</th>
                  <th className="border px-4 py-2">Judul</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Relevan</th>
                  <th className="border px-4 py-2">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((item) => (
                  <tr key={item.newsId} className="hover:bg-gray-50">
                    <td
                      className="border px-4 py-2 max-w-[100px] truncate"
                      title={item.newsId}
                    >
                      {item.newsId}
                    </td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{item.total}</td>
                    <td className="border px-4 py-2">{item.relevant}</td>
                    <td className="border px-4 py-2">
                      <div className="w-full bg-indigo-100 rounded-full h-2.5">
                        <div
                          className="bg-indigo-500 h-2.5 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-indigo-600 mt-1 font-medium">
                        {item.percentage}%
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diagram */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Distribusi Feedback</h3>
          <div style={{ width: '250px' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
