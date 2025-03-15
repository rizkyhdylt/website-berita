import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import Search from '@/components/Search'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="category" two="search news" />
        </div>
      </div>

      {/* Wrapper konten utama */}
      <div className="bg-slate-200 w-full flex-grow">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap justify-center">
            <div className="w-full xl:w-8/12 flex justify-center">
              <Search />
            </div>
          </div>
        </div>
      </div>

      {/* Footer tetap di bawah */}
      <Footer />
    </div>
  )
}

export default Page
