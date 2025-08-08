import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'

const NewsList = () => {
  const { store } = useContext(storeContext)
  const { news_id } = useParams()
  const [news, setNews] = useState(null)

  const getNews = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/${news_id}`, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      })
      setNews(data.news)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getNews()
  }, [news_id])

  if (!news) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-indigo-500 text-lg animate-pulse">Memuat berita...</p>
      </div>
    )
  }

  const formatTanggal = (dateStr) => {
    const d = new Date(dateStr)
    const bulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ]
    return `${d.getDate().toString().padStart(2, '0')} ${bulan[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Judul Berita */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-indigo-500 pb-2">
        {news.title}
      </h1>

      {/* Info Penulis & Tanggal */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <span>✍️ Oleh: <span className="font-medium text-indigo-600">{news.WriterName}</span></span>
        <span>📅 {formatTanggal(news.createdAt)}</span>
        <span>🏷 Kategori: <span className="font-medium">{news.category}</span></span>
        <span>📍 Kota: <span className="font-medium">{news.city}</span></span>
      </div>

      {/* Gambar Berita */}
      <div className="overflow-hidden rounded-lg shadow-md mb-4">
        <img
          src={news.image}
          alt="News"
          className="w-full h-80 object-cover transform hover:scale-105 transition duration-500 ease-in-out"
        />
      </div>

      {/* Deskripsi Berita */}
      <div
        className="prose max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: news.description }}
      />
    </div>
  )
}

export default NewsList
