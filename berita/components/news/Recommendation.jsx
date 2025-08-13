"use client"
import React, { useEffect, useState } from 'react'
import Title from '../Title'
import RekomenCard from './items/RekomenCard'
import { base_api_url } from '@/config/config'

const Recommendation = ({ currentSlug }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => setShowMore(!showMore);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('newsToken');
      if (!token) return;

      try {
        // 🔹 Ambil 10 berita dari API
        const res = await fetch(`${base_api_url}/api/recommendations?limit=10`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setRecommendations(data.data || []);
        } else {
          console.warn('Rekomendasi error:', data.message);
        }
      } catch (err) {
        console.error('Gagal fetch rekomendasi:', err);
      }
    };

    fetchRecommendations();
  }, []);

  // 🔹 Filter berita yang sedang dibaca
  const filtered = currentSlug
    ? recommendations.filter(news => news.slug !== currentSlug)
    : recommendations;

  // 🔹 Tentukan jumlah yang mau ditampilkan (slot penuh)
  const targetCount = showMore ? 6 : 3;
  const displayed = filtered.slice(0, targetCount);

  return (
    <div className="p-4">
      <Title title="Rekomendasi" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {displayed.map((news, idx) => (
          <RekomenCard key={idx} news={news} />
        ))}
      </div>

      {filtered.length > 3 && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-400 px-4 py-2 rounded-full text-sm font-bold"
            onClick={handleToggle}
          >
            {showMore ? "Sembunyikan" : "Rekomendasi lainnya"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Recommendation
