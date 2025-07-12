'use client'
import React, { useEffect, useState, useRef } from 'react'
import KotaCard from './items/KotaCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { base_api_url } from '@/config/config'

const City = () => {
  const [cities, setCities] = useState([])
  const carouselRefs = useRef([])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/city/all`)
        const data = await res.json()
        setCities(data.cities || [])
        console.log("[Kota] Data kota yang diterima:",data.cities)
      } catch (err) {
        console.error('Failed to fetch city data:', err)
      }
    }

    fetchCities()
  }, [])

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  }

  return (
    <div className="bg-[#fce7f3] p-4 ">
      {cities.map((item, index) => {
        if (!carouselRefs.current[index]) {
          carouselRefs.current[index] = React.createRef()
        }

        return (
          <div key={index} className="mb-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div className="text-xl font-bold text-[#333] relative pl-3 before:absolute before:w-[4px] before:h-full before:bg-[#c80000] before:left-0">
                {item.city}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    carouselRefs.current[index]?.current?.previous()
                  }
                  className="w-[30px] h-[30px] bg-white shadow rounded flex items-center justify-center border"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() => carouselRefs.current[index]?.current?.next()}
                  className="w-[30px] h-[30px] bg-white shadow rounded flex items-center justify-center border"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <Carousel
              ref={carouselRefs.current[index]}
              responsive={responsive}
              arrows={false}
              infinite
              itemClass="px-2"
            >
              {item.news?.slice(0, 6).map((newsItem, i) => (
                <KotaCard
                  key={i}
                  cities={newsItem}
                  image={newsItem.image || '/default.jpg'}
                  category={newsItem.category}
                  title={newsItem.title}
                  date={newsItem.date}
                  author={newsItem.author}
                />
              ))}
            </Carousel>
          </div>
        )
      })}
    </div>
  )
}

export default City
