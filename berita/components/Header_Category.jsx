'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsList } from 'react-icons/bs'
import { base_api_url } from '@/config/config'

const Header_Category = () => {
    const path = usePathname()
    const [categories, set_categories] = useState([])
    const [cate_show, set_cate_show] = useState(false)

    const get_categories = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/category/all`)
            const data = await res.json()
            console.log("[Kategori] Data kategori yang diterima:", data.categories);
            set_categories(data.categories)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("Fetching categories...") // Cek apakah fungsi dipanggil
        get_categories()
    }, [])

    return (
        <div className='w-full'>
            {/* Header untuk HP dan Laptop */}
            <div className='bg-black  w-full text-white uppercase font-semibold relative'>
                <div className='px-8 flex justify-between items-center relative h-[48px]'>
                    {/* Tombol menu untuk HP */}
                    <div 
                        onClick={() => set_cate_show(!cate_show)} 
                        className={`text-3xl flex lg:hidden font-bold h-full w-[48px] cursor-pointer justify-center items-center ${cate_show ? 'bg-[#00000026]' : ''} hover:bg-[#00000026]`}
                    >
                        <BsList />
                    </div>

                    {/* Menu Kategori untuk Laptop */}
                    <div className='hidden lg:flex'>
                        <Link 
                            className={`px-6 font-medium py-[13px] ${path === '/' ? 'border-b-2 border-white bg-gray-500' : ''}`} 
                            href='/'
                        >
                            Home
                        </Link>
                        {categories.length > 0 && categories.map((c, i) => (
                            <Link 
                                key={i} 
                                className={`px-6 font-medium py-[13px] ${path === `/news/category/${c.category}` ? 'border-b-2 border-white bg-[#cc0066]' : ''}`} 
                                href={`/news/category/${c.category}`}
                            >
                                {c.category}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dropdown menu untuk HP */}
            {cate_show && (
                <div className='bg-[#ff007b] text-white py-2 lg:hidden flex flex-col'>
                    <Link 
                        onClick={() => set_cate_show(false)}
                        className={`px-6 font-medium py-[10px] ${path === '/' ? 'border-b-2 border-white bg-[#cc0066]' : ''}`} 
                        href='/'
                    >
                        Home
                    </Link>
                    {categories.map((c, i) => (
                        <Link 
                            onClick={() => set_cate_show(false)}
                            key={i} 
                            className={`px-6 font-medium py-[10px] ${path === `/news/category/${c.category}` ? 'border-b-2 border-white bg-[#cc0066]' : ''}`} 
                            href={`/news/category/${c.category}`}
                        >
                            {c.category}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Header_Category