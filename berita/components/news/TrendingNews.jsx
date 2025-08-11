"use client";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import { base_api_url } from "@/config/config";
import Link from "next/link";
import Image from "next/image";

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/trending`);
        const data = await res.json();
        console.log("Trending news data:", data);

        if (data.success) {
          setTrendingNews(data.data || []);
        }
      } catch (err) {
        console.error("Error fetch trending:", err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full gap-y-[14px]">
        <Title title="Trending News" />

        {/* Grid selalu 3 kolom, card lebih kecil di hp */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {trendingNews.length > 0 ? (
            trendingNews.map((news) => (
              <div
                key={news._id}
                className="bg-white overflow-hidden shadow hover:shadow-lg transition rounded-md"
              >
                <Link href={`/news/${news.slug}#top`}>
                  <div className="relative w-full h-24 sm:h-32 md:h-48">
                    <Image
                      src={news.image || "/default.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </Link>
                <div className="p-2 sm:p-3">
                  <Link
                    href={`/news/${news.slug}#top`}
                    className="text-[10px] sm:text-sm font-semibold text-gray-800 hover:text-red-600 line-clamp-2"
                  >
                    {news.title}
                  </Link>
                  <p className="text-[9px] sm:text-xs text-red-600 font-medium mt-1">
                    {news.category}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-3 text-center">
              Tidak ada berita trending saat ini.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingNews;
