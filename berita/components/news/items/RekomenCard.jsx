import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import { base_api_url } from '@/config/config';

const RekomenCard = ({ news }) => {

  const handleClick = async() => {
    const token = localStorage.getItem('newsToken');

    if (!token) {
      console.warn('Token tidak ditemukan, user belum login');
      return;
    }

    try {
      const response = await axios.post(`${base_api_url}/click-history`, {
        beritaId: news._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('History berhasil disimpan:', response.data);
    } catch (error) {
      console.error('Error saving click history:', error);
    }
  };

  return (
    <Link onClick={handleClick} href={`/news/${news.slug}?from=recommendation`} className='min-w-[180px] bg-white rounded-lg shadow-md overflow-hidden'>
      <img 
        src={news.image || '/default-image.jpg'} 
        alt={news.title} 
        className='w-full h-32 object-cover'
      />
      <div className='p-2'>
        <h3 className='text-xs font-bold'>{news.title}</h3>
        <p className='text-xs'>{news.city} - {news.category}</p>
      </div>
    </Link>
  )
}

export default RekomenCard
