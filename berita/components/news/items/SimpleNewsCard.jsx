import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { base_api_url } from '@/config/config';

const SimpleNewsCard = ({ item, type, width = "w-full", height = "h-80" }) => {
  
  const handleClick = async() => {
    const token = localStorage.getItem('newsToken');

    if (!token) {
      console.warn('Token tidak ditemukan, user belum login');
      return;
    }

    try {
      const response = await axios.post(`${base_api_url}/click-history`, {
        beritaId: item._id
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
    <div onClick={handleClick} className={`group relative mt-4 bg-[#ffdcf5] shadow-md rounded-lg pb-4 flex flex-col ${width}`}>
      {/* IMAGE */}
       <Link href={`/news/${item.slug}#top`} className="overflow-hidden block">
        <div className={`relative ${width} ${height} flex-shrink-0`}>
          <Image 
            src={item.image}
            alt={item.title}  
            fill                
            className="object-cover cursor-pointer"  
            unoptimized={true}   
            priority
          />
        </div>
      </Link>

      {/* Pastikan overlay tidak menghalangi klik */}
      <div 
        className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white opacity-5 transition-all duration-300 pointer-events-none' 
      ></div>

      <div className="p-3 flex flex-col flex-grow">
        {/* Link ke halaman berita */}
        <Link href={`/news/${item.slug}#top`} className='text-lg font-semibold text-[#333333] hover:text-[#c80000]'>
          {item.title}
        </Link>

        {/* Link ke kategori berita */}
        <Link href={`/news/category/${item?.category}#top`} className='text-sm font-semibold text-[#c80000] hover:underline'>
          {item.category}
        </Link>

        {/* Informasi tambahan */}
        <div className='flex gap-x-2 text-xs font-normal text-slate-600'>
          <span>{item.date}</span>
          <span>{item.WriterName}</span>
        </div>
      </div>
    </div>
  );
}

export default SimpleNewsCard;
