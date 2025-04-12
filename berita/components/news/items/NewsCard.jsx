import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NewsCard = ({ item }) => {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-2 p-4 border-b border-gray-300 last:border-b-0">
      {/* Gambar */}
      <Link href={`/news/${item.slug}`} className="relative group overflow-hidden h-[93px] w-[160px] lg:w-[150px] sm:w-[100px] sm:h-[100px]">
        <div className="group-hover:scale-[1.1] transition-all duration-[1s] w-full h-full relative">
          <Image
            className="object-cover w-full h-full"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={item?.image}
            alt="images"
          />
          {/* Overlay Hover */}
          <div className="w-full h-full absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
        </div>
      </Link>

      {/* Konten Berita */}
      <div className="flex flex-col gap-y-1 min-h-[93px] items-start">
        {/* Judul Berita */}
        <Link href={`/news/${item?.slug}`} className="text-sm sm:text-xs font-semibold text-[#333333] hover:text-[#c80000]">
          {item.title}
        </Link>

        {/* Kategori Berita */}
        <Link href={`/news/category/${item?.category}`} className="text-sm sm:text-xs font-semibold text-[#c80000]">
          {item.category}
        </Link>

        {/* Tanggal dan Penulis (Hanya tampil di laptop/tablet, hilang di HP) */}
        <div className="hidden sm:flex gap-x-2 text-xs font-normal text-slate-600">
          <span>{item.date}</span>
          <span>{item.WriterName}</span>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
