'use client';

import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { base_api_url } from '@/config/config';
import parse from 'html-react-parser';

import { LuSendHorizontal } from "react-icons/lu";
import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

export default function Details({ slug }) {
  const [news, setNews] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comment, setComment] = useState('');
  const [yourToken, setYourToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('newsToken');
    setYourToken(token);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
        const { news } = await res.json();
        setNews(news);
      } catch (err) {
        console.error('❌ Gagal fetch news:', err);
      }
    };
    fetchNews();
  }, [slug]);

  useEffect(() => {
    const checkStatus = async () => {
      if (!news || !yourToken) return;
      try {
        const res = await fetch(
          `${base_api_url}/api/like/status?targetId=${news._id}&targetType=news`,
          {
            headers: {
              'Authorization': `Bearer ${yourToken}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setLiked(data.liked);
          setDisliked(data.disliked);
        } else {
          console.warn('⚠️ Status error:', data.message);
        }
      } catch (err) {
        console.error('❌ Gagal check status:', err);
      }
    };
    checkStatus();
  }, [news, yourToken]);

  const handleLike = async () => {
    if (!yourToken) return console.warn('🚫 Harus login!');
    console.log('👍 LIKE...');
    try {
      const res = await fetch(`${base_api_url}/api/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourToken}`,
        },
        body: JSON.stringify({ targetId: news._id, targetType: 'news' }),
      });
      const data = await res.json();
      if (res.ok) {
        setLiked(true);
        setDisliked(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('❌ Gagal like:', err);
    }
  };

  const handleUnlike = async () => {
    if (!yourToken) return console.warn('🚫 Harus login!');
    console.log('👎 UNLIKE...');
    try {
      const res = await fetch(`${base_api_url}/api/unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourToken}`,
        },
        body: JSON.stringify({ targetId: news._id, targetType: 'news' }),
      });
      const data = await res.json();
      if (res.ok) {
        setLiked(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('❌ Gagal unlike:', err);
    }
  };

  const handleDislike = async () => {
    if (!yourToken) return console.warn('🚫 Harus login!');
    console.log('👎 DISLIKE...');
    try {
      const res = await fetch(`${base_api_url}/api/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourToken}`,
        },
        body: JSON.stringify({ targetId: news._id, targetType: 'news' }),
      });
      const data = await res.json();
      if (res.ok) {
        setDisliked(true);
        setLiked(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('❌ Gagal dislike:', err);
    }
  };

  const handleUndislike = async () => {
    if (!yourToken) return console.warn('🚫 Harus login!');
    console.log('👍 UNDISLIKE...');
    try {
      const res = await fetch(`${base_api_url}/api/undislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourToken}`,
        },
        body: JSON.stringify({ targetId: news._id, targetType: 'news' }),
      });
      const data = await res.json();
      if (res.ok) {
        setDisliked(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('❌ Gagal undislike:', err);
    }
  };

  if (!news) return <div>Loading...</div>;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#dfd3c3]">
      <div className="flex-grow flex justify-center">
        <div className="bg-[#ffdcf5] max-w-4xl w-full p-6 shadow-lg rounded-md text-left">
          <Breadcrumb one={news.category} two={news.title} />

          <h1 className="text-sm font-bold mt-4">{news.city}</h1>
          <h1 className="text-3xl font-bold mt-3">{news.title}</h1>
          <p className="text-xs text-gray-400 mt-1">{news.date}</p>
          <p className="text-sm text-gray-600">{news.WriterName ? `Oleh: ${news.WriterName}` : 'Penulis tidak tersedia'}</p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-gray-600">Bagikan:</span>
            <div className="flex gap-3">
              <Link href="#"><FaInstagram size={24} className="text-pink-600 hover:opacity-80 transition" /></Link>
              <Link href="#"><FaFacebook size={24} className="text-blue-600 hover:opacity-80 transition" /></Link>
              <Link href="#"><FaTiktok size={24} className="text-black hover:opacity-80 transition" /></Link>
            </div>
          </div>

          <img src={news.image} alt="Illustration" className="w-full mt-4 rounded-md" />

          <div className="mt-4 text-gray-700 text-sm leading-normal text-justify">
            {parse(news.description)}
          </div>

          <div className="mt-6 text-blue-600 font-bold text-sm cursor-pointer text-left">
            Baca Juga: Bupati Blora, SKK Migas Beri Apresiasi Positif Gelaran Pra UKW Oleh PWI Blora
          </div>

          <div className="p-6 flex flex-col gap-4 max-w-xl mx-auto font-sans">
            <div className="flex justify-around bg-gray-300 p-4 rounded-xl text-black text-2xl">
              <button onClick={liked ? handleUnlike : handleLike}>
                <BiLike className={liked ? 'text-blue-600' : ''} />
              </button>
              <button onClick={disliked ? handleUndislike : handleDislike}>
                <BiDislike className={disliked ? 'text-red-600' : ''} />
              </button>
              <button><FiShare2 /></button>
              <button><BiCommentDetail /></button>
            </div>
            <div className="bg-gray-300 p-4 rounded-xl">
              <h2 className="font-bold mb-2">Berikan Komentar</h2>
              <div className="flex items-center bg-white p-2 rounded-lg border">
                <input
                  type="text"
                  placeholder="Tulis Komentar"
                  className="flex-grow outline-none px-2 text-black"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="text-gray-700 hover:text-black">
                  <LuSendHorizontal />
                </button>
              </div>
              <p className="text-xs text-black mt-2">
                Isi komentar sepenuhnya adalah tanggung jawab pengguna dan diatur dalam UU ITE
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-64 ml-6 bg-gray-200 text-center p-4 h-full shadow-md">
          Advertisement
        </div>
      </div>

      <Footer />
    </div>
  );
}
