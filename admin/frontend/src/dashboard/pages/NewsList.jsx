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

    if (!news) return <p>Loading...</p>

    return (
        <div className="p-4 bg-white rounded shadow">
            <h1 className="text-xl font-bold mb-2">{news.title}</h1>
            <p className="text-sm text-gray-500 mb-2">Oleh: {news.WriterName}</p>
            <p className="text-sm text-gray-500 mb-2">
  {(() => {
    const d = new Date(news.createdAt);
    const bulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${d.getDate().toString().padStart(2, '0')} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  })()}
</p>
            <p className="text-sm text-gray-500 mb-2">Kategori: {news.category} | Kota: {news.city}</p>
            <img src={news.image} alt="News" className="w-full h-80 object-cover rounded mb-4" />
            <div dangerouslySetInnerHTML={{ __html: news.description }} />
        </div>
    )
}

export default NewsList
