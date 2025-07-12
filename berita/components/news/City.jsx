'use client'

import React, { useEffect, useState } from 'react'
import KotaCard from './items/KotaCard'
import { base_api_url } from '@/config/config'

const City = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/city/all`)
        const data = await res.json()
        setCities(data.cities || [])
        console.log("[Kota] Data kota yang diterima:", data.cities)
      } catch (err) {
        console.error('Failed to fetch city data:', err)
      }
    }

    fetchCities()
  }, [])

  return (
    <div className="bg-[#fce7f3] p-4">
      {cities.map((item, index) => (
        <div key={index} className="mb-10">
          {/* Header */}
          <div className="text-xl font-bold text-[#333] relative pl-3 mb-3 before:absolute before:w-[4px] before:h-full before:bg-[#c80000] before:left-0">
            {item.city}
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto gap-4">
            {item.news?.map((newsItem, i) => (
              <div className="flex-shrink-0 w-[300px]" key={i}>
                <KotaCard
                  cities={newsItem}
                  image={newsItem.image || '/default.jpg'}
                  category={newsItem.category}
                  title={newsItem.title}
                  date={newsItem.date}
                  author={newsItem.author}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default City
