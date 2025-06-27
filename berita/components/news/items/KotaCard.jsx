// KotaCard.jsx
"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { base_api_url } from '@/config/config'
import Link from 'next/link'

const KotaCard = ({ cities }) => {
  const router = useRouter()

  const handleClick = async (e) => {

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
    <div className="relative w-full h-[250px] sm:h-[230px] group">
      <Image
        src={cities?.image}
        alt="image"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover rounded-lg"
      />
      <Link
        onClick={handleClick}
         href={`/news/${cities.slug}#top`}
        className="absolute inset-0 w-full h-full block invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300 rounded-lg"
      ></Link>
      <div className="absolute bottom-4 left-4 text-white font-semibold z-10 flex flex-col gap-y-1">
        <Link href={`/news/category/${cities?.category}#top`} className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000] w-fit">
          {cities?.category} {/* Tampilkan kategori */}
        </Link>
        <Link href={`/news/${cities.slug}#top`} className="text-base leading-tight hover:text-red-700">{cities?.title}</Link>
        <div className="flex gap-x-2 text-sm font-normal text-gray-200">
          <span>{cities?.date}</span>
          <span>{cities?.WriterName}</span>
        </div>
      </div>
    </div>
  )
}

export default KotaCard
