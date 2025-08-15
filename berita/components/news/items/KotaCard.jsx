// KotaCard.jsx
"use client"
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { base_api_url } from '@/config/config'
import Link from 'next/link'

const KotaCard = ({ cities }) => {
  
  const handleClick = async () => {
    const token = localStorage.getItem('newsToken')
    if (!token) {
      console.warn('Token tidak ditemukan, user belum login')
      return
    }

    if (!cities?._id) {
      console.warn('ID berita tidak ditemukan')
      return
    }

    try {
      const response = await axios.post(`${base_api_url}/click-history`, {
        beritaId: cities._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('History berhasil disimpan:', response.data);
    } catch (error) {
      console.error("Gagal simpan klik:", error)
    }
  }

  return (
    <div onClick={handleClick} className="relative w-full h-[160px] sm:h-[180px] overflow-hidden shadow-md hover:shadow-lg transition-all group">
      <Image
        src={cities?.image || '/default.jpg'}
        alt={cities?.title || 'Berita Kota'}
        fill
        sizes="(max-width: 640px) 220px, 33vw"
        className="object-cover"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Click area */}
      <Link
        
        href={`/news/${cities.slug}#top`}
        className="absolute inset-0 z-10"
      />

      {/* Content */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <Link 
          href={`/news/category/${cities?.category}#top`} 
          className="px-2 py-[2px] bg-[#c80000] text-white text-xs rounded-sm"
        >
          {cities?.category}
        </Link>

        <Link 
          href={`/news/${cities.slug}#top`} 
          className="block text-white font-semibold mt-1 text-sm leading-tight line-clamp-2 hover:text-red-400"
        >
          {cities?.title}
        </Link>

        <div className="flex gap-x-2 text-[11px] text-gray-300 mt-1">
          <span>{cities?.date}</span>
          <span>{cities?.WriterName}</span>
        </div>
      </div>
    </div>
  )
}

export default KotaCard
