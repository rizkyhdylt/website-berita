"use client"
import React, { useEffect, useState } from 'react'
import Title from '../Title'
import RekomenCard from './items/RekomenCard'
import { base_api_url } from '@/config/config'

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([])
  const [showMore, setShowMore] = useState(false)

  const handleToggle = () => setShowMore(!showMore)

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('newsToken')
      if (!token) return

      try {
        const res = await fetch(`${base_api_url}/api/recommendations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setRecommendations(data.data);
        } else {
          console.warn('Rekomendasi error:', data.message)
        }
      } catch (err) {
        console.error('Gagal fetch rekomendasi:', err)
      }
    }

    fetchRecommendations()
  }, [])

  return (
    <div className='bg-[#ffdcf5] p-4 rounded-lg '>
      <Title title="Rekomendasi" />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
        {recommendations.slice(0, showMore ? 6 : 3).map((news, idx) => (
          <RekomenCard key={idx} news={news} />
        ))}
      </div>

      {recommendations.length > 3 && recommendations.length <= 6 && (
        <div className='flex justify-center mt-4'>
          <button
            className='bg-gray-200 px-4 py-2 rounded-full text-sm'
            onClick={handleToggle}
          >
            {showMore ? 'Sembunyikan' : 'Rekomendasi lainnya'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Recommendation
