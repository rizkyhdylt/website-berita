// City.jsx
'use client'

import React, { useEffect, useState } from 'react'
import KotaCard from './items/KotaCard'
import { base_api_url } from '@/config/config'

const City = () => {
  const [cities, setCities] = useState([])

  const allowedCities = ["Rembang", "Semarang", "Blora", "Pati"]

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/city/all`)
        const data = await res.json()

        // Filter hanya kota yang diizinkan
        const filteredCities = (data.cities || []).filter(item =>
          allowedCities.includes(item.city)
        )

        setCities(filteredCities)
        console.log("[Kota] Data kota yang ditampilkan:", filteredCities)
      } catch (err) {
        console.error('Failed to fetch city data:', err)
      }
    }

    fetchCities()
  }, [])

  return (
    <div className=" p-4">
      {cities.map((item, index) => (
        <div key={index} className="mb-8">
          {/* Header */}
          <div className="text-lg sm:text-xl font-bold text-[#fff] relative pl-3 mb-4 before:absolute before:w-[4px] before:h-full before:bg-[#c80000] before:left-0">
            {item.city}
          </div>

          {/* Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {item.news?.map((newsItem, i) => (
              <div className="flex-shrink-0 w-[220px]" key={i}>
                <KotaCard cities={newsItem} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default City
