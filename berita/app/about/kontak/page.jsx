import Footer from '@/components/Footer'
import React from 'react'

const page = () => {
  return (
    <div id="top" className='min-h-screen flex flex-col bg-[#dfd3c3]'>
      <div className='flex-grow flex justify-center'>
        <div className="bg-[#ffdcf5] max-w-4xl w-full p-6 shadow-lg rounded-md text-justify">
          <h1 className="text-3xl font-bold mb-4">Kontak Kami</h1>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default page
