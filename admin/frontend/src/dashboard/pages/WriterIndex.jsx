import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {FaEye } from 'react-icons/fa'
import berita from '../Assets/berita3.jpg'
import storeContext from '../../context/storeContext'
import {base_url} from '../../config/config'
import {convert} from 'html-to-text'
import toast from 'react-hot-toast'
import axios from 'axios'

const WriterIndex = () => {
  const { store } = useContext(storeContext)
    const [news, setNews] = useState([])
    const [all_news, set_all_news] = useState([])
    const [writers, setWriters] = useState([])
  
    const [parPage, setParPage] = useState(5)
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)
  
    const get_news = async () => {
          
      try {
          const { data } = await axios.get(`${base_url}/api/news`,{
              headers: {
                    "Authorization": `Bearer ${store.token}`
              }
          })
          console.log(data)
          set_all_news(data.news)
          setNews(data.news)
          
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      get_news(),
      get_writers()
  },[])

  const get_writers = async() => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/writers`, 
        {
          headers : {
            'Authorization' : `Bearer ${store.token}`
          }
        })
      setWriters(data.writers)
    }catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className='mt-3'>
      <div className='grid grid-cols-4 gap-x-3'>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>{all_news.length}</span>
          <span className='text-md'>Total News</span>
        </div>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>{all_news.filter(n => n.status === 'pending').length}</span>
          <span className='text-md'>Panding News</span>
        </div>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>{all_news.filter(n => n.status === 'active').length}</span>
          <span className='text-md'>Active News</span>
        </div>
        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-x1 font-bold'>{all_news.filter(n => n.status === 'deactive').length}</span>
          <span className='text-md'>Deactive News</span>
        </div>
      </div>
      <div className='bg-white p-4 mt-5'>
        <div className='flex justify-between items-center pb-4'>
          <h2>Recent News</h2>
          <Link to="/dashboard/news">View all</Link>
        </div>
        <div className='relative overflow-x-auto p-4'>
            <table className='w-full text-sm text-left text-slate-600'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th className='px-7 py-3'>No</th>
                        <th className='px-7 py-3'>Title</th>
                        <th className='px-7 py-3'>Image</th>
                        <th className='px-7 py-3'>Category</th>
                        <th className='px-7 py-3'>City</th>
                        <th className='px-7 py-3'>Description</th>
                        <th className='px-7 py-3'>Date</th>
                        <th className='px-7 py-3'>Status</th>
                        <th className='px-7 py-3'>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      news.length> 0 && news.slice((page-1)*parPage, page*parPage).map((n, i) => <tr key={i} className='bg-white border-b'>
                      <td className='px-6 oy-4'>{i+1}</td>
                      <td className='px-6 oy-4'>{n.title.slice(0,15)}...</td>
                      <td className='px-6 oy-4'>
                          <img className='w-[40px] h-[40px]' src={n.image}/>
                      </td>
                      <td className='px-6 oy-4'>{n.category}</td>
                      <td className='px-6 oy-4'>{n.city}</td>
                      <td className='px-6 oy-4'>{convert(n.description).slice(0,15)}...</td>
                      <td className='px-6 oy-4'>{n.date}</td>
                      <td className='px-6 oy-4'>
                          {
                                n.status === 'pending' && <span className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>
                            }
                            {
                                n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>
                            }
                            {
                                n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>
                            }
                      </td>
                      <td className='px-6 oy-4'>
                          <div className='flex justify-start items-center gap-x-4 text-white'>
                              <Link to={`/dashboard/news/view/${n._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>        
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

export default WriterIndex
