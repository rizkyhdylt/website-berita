'use client';

import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { base_api_url } from '@/config/config';
import parse from 'html-react-parser';
import Recommendation from "@/components/news/Recommendation";
import { LuSendHorizontal } from "react-icons/lu";
import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useSearchParams } from 'next/navigation';
import Advertisement from '@/components/news/items/Advertisement';
import axios from 'axios';
import Terkini from '@/components/news/Terkini';

export default function Details({ slug }) {
  const [news, setNews] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comment, setComment] = useState('');
  const [yourToken, setYourToken] = useState(null);
  const [comments, setComments] = useState([]);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const searchParams = useSearchParams();
  const isFromRecommendation = searchParams.get('from') === 'recommendation';
  const [hasFeedback, setHasFeedback] = useState(false);
  const [sortedNews, setSortedNews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('newsToken');
    setYourToken(token);

    const stored = localStorage.getItem('userInfo');
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

   useEffect(() => {
  if (!news?._id) return; // Pastikan news ada

  const addView = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/${news._id}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`
        },
        body: JSON.stringify({}) // kalau backend tidak butuh body, bisa dihapus
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("View ditambahkan:", data);
    } catch (error) {
      console.error("Gagal menambah view", error);
    }
  };
    addView();
}, [news?._id]);


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

  const fetchComments = async () => {
    if (!news?._id) return;
    try {
      const res = await fetch(`${base_api_url}/api/comments/${news._id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('❌ Gagal fetch komentar:', err);
    }
  };

  const submitComment = async () => {
    if (!comment.trim()) return alert('Komentar tidak boleh kosong');
    if (!yourToken) return alert('Kamu harus login untuk berkomentar');

    try {
      const res = await fetch(`${base_api_url}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify({ newsId: news._id, comment })
      });

      const data = await res.json();
      if (res.ok) {
        setComment('');
        fetchComments(); // refresh komentar setelah kirim
      } else {
        alert(data.message || 'Gagal mengirim komentar');
      }
    } catch (err) {
      console.error('❌ Gagal kirim komentar:', err);
    }
  };

  useEffect(() => {
    if (news?._id) fetchComments();
  }, [news]);

  const toggleDropdown = (commentId) => {
    setDropdownOpenId(prev => (prev === commentId ? null : commentId));
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const confirm = window.confirm('Yakin ingin menghapus komentar ini?');
      if (!confirm) return;

      await axios.delete(`${base_api_url}/api/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${yourToken}`
        }
      });

      // Refresh komentar
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus komentar');
    }
  };

  const handleFeedback = async (relevan) => {
  try {
    const res = await fetch(`${base_api_url}/api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourToken}`
      },
      body: JSON.stringify({ newsId: news._id, isRelevant: relevan }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Terima kasih atas feedback Anda!');
      setHasFeedback(true); // sembunyikan tombol setelah feedback
    } else {
      alert(data.message || 'Gagal mengirim feedback');
    }
  } catch (err) {
    console.error('❌ Gagal kirim feedback:', err);
  }
};


useEffect(() => {
  const checkFeedback = async () => {
    try {
      if (!news || !news._id) return;
      const res = await fetch(`${base_api_url}/api/feedback/check?newsId=${news._id}`, {
        headers: {
          Authorization: `Bearer ${yourToken}`
        }
      });

      const data = await res.json();
      if (res.ok && data.hasFeedback) {
        setHasFeedback(true);
      }
    } catch (err) {
      console.error('❌ Gagal cek feedback:', err);
    }
  };

  checkFeedback();
}, [news?._id]);

useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/all/news`);
        if (!res.ok) throw new Error(`Gagal ambil data: ${res.statusText}`);

        const data = await res.json();
        const news = data?.news || {};

        const allNews = Object.values(news).flat();
        const sorted = allNews.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setSortedNews(sorted);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);



  if (!news) return <div>Loading...</div>;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#dfd3c3]">
      <div className="justify-center flex flex-col lg:flex-row gap-4">
        <div className="bg-[#ffdcf5] max-w-4xl w-9/12 p-6 shadow-lg text-left">
          <>
          <Breadcrumb one={news.category} two={news.title} />

          <h1 className="text-sm font-bold mt-4">{news.city}</h1>
          <h1 className="text-3xl font-bold mt-3">{news.title}</h1>
          <p className="text-xs text-gray-400 mt-1">{news.date}</p>
          <p className="text-sm text-gray-600">{news.WriterName ? `Oleh: ${news.WriterName}` : 'Penulis tidak tersedia'}</p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-gray-600">Bagikan:</span>
            <div className="flex gap-3">
               {/* <Link href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} className="text-pink-600 hover:opacity-80 transition" />
                </Link> */}
                <Link href={`https://wa.me/?text=${encodeURIComponent(news.title + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={24} className="text-green-500 hover:opacity-80 transition" />
                </Link>
               <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={24} className="text-blue-600 hover:opacity-80 transition" />
                </Link>
                 <Link href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer">
                  {/* Gunakan icon Telegram dari react-icons/fa */}
                  <FaTelegram size={24} className="text-blue-400 hover:opacity-80 transition" />
                </Link>
                <Link href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer">
                  {/* Gunakan icon Twitter/X dari react-icons/fa */}
                  <FaXTwitter size={24} className="text-black hover:opacity-80 transition" />
                </Link>
              {/* <Link href="#"><FaTiktok size={24} className="text-black hover:opacity-80 transition" /></Link> */}
            </div>
          </div>

          <img src={news.image} alt="Illustration" className="w-full mt-4" />

          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div className="lg:w-4/12">
              <div className="sticky top-40">
                <Advertisement slot={4} />
              </div>
            </div>
            <div className="text-gray-700 text-sm leading-normal text-justify lg:w-8/12">
              {parse(news.description)}
              <div className="mt-6 text-blue-600 font-bold text-sm cursor-pointer text-left">
                Baca Juga: Bupati Blora, SKK Migas Beri Apresiasi Positif Gelaran Pra UKW Oleh PWI Blora
              </div>
            </div>     
          </div>

          <div className="p-6 flex flex-col gap-4 max-w-xl mx-auto font-sans">
            <div className="flex justify-around bg-gray-300 p-4 rounded-xl text-black text-2xl">
              <button onClick={liked ? handleUnlike : handleLike}>
                <BiLike className={liked ? 'text-blue-600' : ''} />
              </button>
              <button onClick={disliked ? handleUndislike : handleDislike}>
                <BiDislike className={disliked ? 'text-red-600' : ''} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link berita berhasil disalin!');
                }}
                className="hover:text-blue-600">
                <FiShare2 />
              </button>
              {/* <button><BiCommentDetail /></button> */}
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
                <button onClick={submitComment} className="text-gray-700 hover:text-black">
                  <LuSendHorizontal />
                </button>
              </div>
              <p className="text-xs text-black mt-2">
                Isi komentar sepenuhnya adalah tanggung jawab pengguna dan diatur dalam UU ITE
              </p>
            </div>
            <div className="bg-gray-300 p-4 rounded-xl">             
              {comments.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Komentar ({comments.length})</h2>
                <div className="space-y-4">
                  {comments.map((item, index) => {
                    // const isOwner = userInfo?.id === item.userId?._id;
                    // const isAdmin = userInfo?.role === 'admin';
                    // const canDelete = isOwner || isAdmin;

                    return (
                      <div key={index} className="bg-gray-100 p-3 rounded-md shadow-sm flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          {item.userId?.image ? (
                            <img
                              src={item.userId.image}
                              alt="avatar"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-semibold">
                              {item.userId?.name
                                ?.split(' ')
                                .map(word => word[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase() || 'A'}
                            </div>
                          )}

                          <div>
                            <p className="font-semibold">
                              {item.userId?.name || 'Anonim'}
                            </p>
                            <p className="text-gray-700">{item.comment}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(item.createdAt).toLocaleString('id-ID', {
                                dateStyle: 'short',
                                timeStyle: 'short'
                              })}
                            </p>
                          </div>
                        </div>
                          <div className="relative ml-4">
                            <button onClick={() => toggleDropdown(item._id)} className="text-gray-600 hover:text-black">
                              <HiOutlineDotsVertical size={20} />
                            </button>
                            {dropdownOpenId === item._id && (
                              <div className="absolute right-0 mt-1 bg-white border rounded shadow-md z-10">
                                <button onClick={() => handleDeleteComment(item._id)} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-4">Belum ada komentar.</p>
            )}
            </div>
          </div>

          <div className="bg-gray-600 w-full px-6 py-4 mt-4">
            <Recommendation />
          </div>
          </>
          {isFromRecommendation && !hasFeedback && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3 bg-[#f5f5f5] p-3 rounded-xl shadow">
              <span className="text-sm font-medium text-gray-800">Apakah rekomendasi ini relevan?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFeedback(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition text-sm text-gray-700"
                >
                  <BiLike className="text-lg" /> Ya
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition text-sm text-gray-700"
                >
                  <BiDislike className="text-lg" /> Tidak
                </button>
              </div>
            </div>
          )}
          </div>  
        <div className="lg:block w-2/12 mt-4 mb-4 space-y-4 sticky top-4 self-start">
          <Terkini news={sortedNews.slice(0, 5)} />
          <Advertisement slot={1}/>
          <Advertisement slot={2}/>
          <Advertisement slot={3}/>
        </div>
      </div>

      <Footer />
    </div>
  );
}
