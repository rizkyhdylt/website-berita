import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CityCard = ({ imageUrl, category, title, date, author }) => {
  return (
    <div className="relative h-[250px] sm:h-[230px] w-full group overflow-hidden rounded-lg">
      {/* Gambar */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Overlay Link */}
      <Link
        href="#"
        className="absolute inset-0 z-10 invisible group-hover:visible bg-black opacity-10 transition-all duration-300"
      ></Link>

      {/* Info Teks */}
      <div className="absolute bottom-4 left-4 z-20 text-white font-semibold space-y-1">
        <div className="bg-[#c80000] text-[13px] px-2 py-1 rounded-sm inline-block">{category}</div>
        <h2 className="text-sm">{title}</h2>
        <div className="flex gap-x-2 text-xs">
          <span>{date}</span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  )
}

export default CityCard
