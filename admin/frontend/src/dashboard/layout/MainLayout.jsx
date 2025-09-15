import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-w-screen min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Konten utama */}
      <div className="md:ml-[250px] w-full md:w-[calc(100vw-250px)] min-h-[100vh]">
        <Header setSidebarOpen={setSidebarOpen} />
        <div className="p-4">
          <div className="pt-[85px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
