import React from 'react'
import { Link } from 'react-router-dom'
import {FaEye } from 'react-icons/fa'
import berita from '../Assets/berita3.jpg'

const AdminIndex = () => {
  return (
    <div className='mt-3'>
      <div className='grid grid-cols-5 gap-x-4'>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>50</span>
          <span className='text-md'>Total News</span>
        </div>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>50</span>
          <span className='text-md'>Panding News</span>
        </div>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>50</span>
          <span className='text-md'>Active News</span>
        </div>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>50</span>
          <span className='text-md'>Deactive News</span>
        </div>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>50</span>
          <span className='text-md'>Writers</span>
        </div>
      </div>
      <div className='bg-white p-4 mt-5'>
        <div className='flex justify-between items-center pb-4'>
          <h2>Recent News</h2>
          <Link>View all</Link>
        </div>
        <div className='relative overflow-x-auto p-4'>
            <table className='w-full text-sm text-left text-slate-600'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th className='px-7 py-3'>No</th>
                        <th className='px-7 py-3'>Title</th>
                        <th className='px-7 py-3'>Image</th>
                        <th className='px-7 py-3'>Category</th>
                        <th className='px-7 py-3'>Description</th>
                        <th className='px-7 py-3'>Date</th>
                        <th className='px-7 py-3'>Status</th>
                        <th className='px-7 py-3'>Active</th>
                    </tr>
                </thead>
                <tbody>
                   {
                      [1,2,3,4,5,6,7].map((n,i)=> <tr key={i} className='bg-white border-b'>
                      <td className='px-6 oy-4'>{i+1}</td>
                      <td className='px-6 oy-4'>Title judul satu berita terbaru...</td>
                      <td className='px-6 oy-4'>
                          <img className='w-[40px] h-[40px]' src={berita}/>
                      </td>
                      <td className='px-6 oy-4'>Politik</td>
                      <td className='px-6 oy-4'>Deskripsi berita terbaru...</td>
                      <td className='px-6 oy-4'>10 July 2024</td>
                      <td className='px-6 oy-4'>
                          <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>active</span>
                      </td>
                      <td className='px-6 oy-4'>
                          <div className='flex justify-start items-center gap-x-4 text-white'>
                              <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>        
                          </div>
                      </td>
                  </tr>)
                   }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default AdminIndex
