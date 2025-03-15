'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { base_api_url } from '@/config/config';
import SimpleDetailsNewsCard from './news/items/SimpleDetailsNewsCard';


function SearchContent() {
  const [news, setNews] = useState([]);
  const searchParams = useSearchParams(); // Hook ini harus di dalam Suspense
  const value = searchParams.get('value');

  const get_news = async () => {
    try {
      if (!value || value.trim() === '') return; // Cegah fetch jika value kosong
      const res = await fetch(`${base_api_url}/api/search/news?value=${encodeURIComponent(value)}`);
      const { news } = await res.json();
      setNews(news || []); // Default ke array kosong jika tidak ada data
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]); // Set ke kosong jika gagal
    }
  };

  useEffect(() => {
    get_news();
  }, [value]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {news.map((item, i) => (
            <SimpleDetailsNewsCard news={item} key={i} type="details-news" height={200} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10">
          News tidak ditemukan
        </div>
      )}
    </div>
  );
}


export default function Search() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}