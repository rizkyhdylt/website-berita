import React from 'react'
import Footer from '@/components/Footer'
import { FaBullhorn } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'

const page = () => {
  return (
    <div id="top" className='min-h-screen flex flex-col bg-[#dfd3c3]'>
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="bg-[#ffdcf5] max-w-3xl w-full p-8 shadow-xl rounded-2xl text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <FaBullhorn className="text-3xl text-pink-600" />
            <h2 className='text-3xl font-bold'>Info Iklan</h2>
          </div>
          <p className='text-gray-700 text-lg mb-2'>
            Ingin mempromosikan bisnis atau layanan Anda? Pasang iklan di <strong>Jateng Update</strong> dan jangkau ribuan pembaca setiap hari!
          </p>
          <p className='text-gray-800 text-lg font-semibold mb-1'>Hubungi Kami:</p>
          <p className='text-xl font-bold text-blue-600'>📞 0822-1019-8989</p>

          <a 
            href="https://wa.me/6282210198989" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            <FaWhatsapp className="text-lg" />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default page
