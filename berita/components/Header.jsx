'use client'
import React, { useState } from 'react'
import moment from 'moment';
import { RiAccountCircleFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import logo from '../assets/logojateng.png';
import Image from 'next/image';
import Header_Category from './Header_Category';
import { useRouter } from 'next/navigation';



const Header = () => {
  const router = useRouter();
  const [state, setState] = useState('');
    
  const search = (e) => {
    e.preventDefault();
    router.push(`/search/news?value=${state}`);
    setState('');
  }

  return (  
    <div className="bg-gray-100 sticky top-0 z-50 w-full">
      {/* Date Time */}
      <div className="px-5 lg:px-5 flex justify-between items-center bg-[#333333] text-[#cccccc]">
        <span className="text-[13px] font-medium">{moment().format('LLLL')}</span>
      </div>
        
      {/* Navbar */}
      <nav className="bg-cyan-400 text-white py-1 px-3 flex items-center">
        {/* Logo dengan responsive ukuran */}
        <div className="w-[100px] h-[50px] sm:w-[80px] sm:h-[40px] flex-shrink-0">
          <Image 
            src={logo} 
            alt="Jatengupdates Logo" 
            width={100} 
            height={50}
            className="object-contain w-full h-full"
          />
        </div>
        
        {/* Search bar */}
        <form onSubmit={search} className="flex-grow flex justify-center">
          <div className="relative w-1/3 sm:w-1/2">
            <input
              required
              onChange={(e) => setState(e.target.value)}
              type="text"
              placeholder="Search Topik"
              className="px-3 py-1 rounded-xl text-black w-full pl-10"
            />
            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </form>
        
        {/* Profile Icon - pushed to the right */}
        <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
          <div className="ml-auto w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
            <RiAccountCircleFill className="text-3xl" />
          </div>
        </a>

      </nav>
      <Header_Category />
    </div>
  );
}

export default Header;
