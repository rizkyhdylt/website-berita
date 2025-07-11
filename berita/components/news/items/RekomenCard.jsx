import React from 'react'
import Link from 'next/link'

const RekomenCard = ({ news }) => {
  return (
    <Link href={`/news/${news.slug}`} className='min-w-[180px] bg-white rounded-lg shadow-md overflow-hidden'>
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
