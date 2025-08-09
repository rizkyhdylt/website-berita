import React, { useContext, useState, useEffect } from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { base_url } from '../../config/config'
import axios from 'axios'
import storeContext from '../../context/storeContext'
import { convert } from 'html-to-text'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const NewContent = () => {
  const { store } = useContext(storeContext)
  const [news, setNews] = useState([])
  const [all_news, set_all_news] = useState([])

  const [parPage, setParPage] = useState(5)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const [res, set_res] = useState({ id: '', loader: false })

  const get_news = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      })
      set_all_news(data.news)
      setNews(data.news)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_news()
  }, [])

  useEffect(() => {
    if (news.length > 0) {
      setPages(Math.ceil(news.length / parPage))
    }
  }, [news, parPage])

  const type_filter = (e) => {
    if (e.target.value === '') {
      setNews(all_news)
    } else {
      setNews(all_news.filter(n => n.status === e.target.value))
    }
    setPage(1)
  }

  const search_news = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setNews(all_news.filter(n => n.title.toLowerCase().includes(searchValue)))
    setPage(1)
  }

  const update_status = async (status, news_id) => {
    try {
      set_res({ id: news_id, loader: true })
      const { data } = await axios.put(`${base_url}/api/news/status-update/${news_id}`, { status }, {
        headers: { Authorization: `Bearer ${store.token}` }
      })
      toast.success(data.message)
      get_news()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal update status')
    } finally {
      set_res({ id: '', loader: false })
    }
  }

  const deleteNews = async (news_id) => {
    if (!window.confirm('Yakin ingin menghapus berita ini?')) return
    try {
      set_res({ id: news_id, loader: true })
      await axios.delete(`${base_url}/api/news/delete/${news_id}`, {
        headers: { Authorization: `Bearer ${store.token}` }
      })
      toast.success('Berita berhasil dihapus')
      const filtered = all_news.filter(n => n._id !== news_id)
      set_all_news(filtered)
      setNews(filtered)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menghapus berita')
    } finally {
      set_res({ id: '', loader: false })
    }
  }

  return (
    <div>
      {/* Filter & Search */}
      <motion.div
        className='px-4 py-3 flex gap-x-3'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <select onChange={type_filter} className='px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 h-10'>
          <option value="">---select type---</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>
        <input onChange={search_news} type='text' placeholder='search news'
          className='px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 h-10' />
      </motion.div>

      {/* Table */}
      <div className='relative overflow-x-auto p-4'>
        <motion.table
          className='w-full text-sm text-left text-slate-600 rounded-lg overflow-hidden shadow-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <thead className='text-xs text-white uppercase bg-gradient-to-r from-indigo-500 to-purple-500'>
            <tr>
              <th className='px-6 py-3'>No</th>
              <th className='px-6 py-3'>Title</th>
              <th className='px-6 py-3'>Image</th>
              <th className='px-6 py-3'>Category</th>
              <th className='px-6 py-3'>City</th>
              <th className='px-6 py-3'>Description</th>
              <th className='px-6 py-3'>View</th>
              <th className='px-6 py-3'>Date</th>
              <th className='px-6 py-3'>Status</th>
              <th className='px-6 py-3'>Active</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {news.length > 0 && news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                <motion.tr
                  key={n._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  whileHover={{ backgroundColor: "#f0fdf4" }}
                  transition={{ duration: 0.2 }}
                  className='bg-white border-b'
                >
                  <td className='px-6 py-4'>{(page - 1) * parPage + (i + 1)}</td>
                  <td className='px-6 py-4 font-semibold'>{n.title.slice(0, 15)}...</td>
                  <td className='px-6 py-4'>
                    <img className='w-12 h-12 rounded-lg object-cover shadow-sm' src={n.image} alt="news" />
                  </td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-600'>
                      {n.category}
                    </span>
                  </td>
                  <td className='px-6 py-4'>{n.city}</td>
                  <td className='px-6 py-4'>{convert(n.description).slice(0, 15)}...</td>
                  <td className='px-6 py-4'>{n.totalViews}</td>
                  <td className='px-6 py-4'>
                    {(() => {
                      const d = new Date(n.createdAt)
                      const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
                      return `${d.getDate().toString().padStart(2, '0')} ${bulan[d.getMonth()]} ${d.getFullYear()}`
                    })()}
                  </td>
                  <td className='px-6 py-4'>
                    {store?.userInfo?.role === 'admin' ? (
                      <>
                        {['pending', 'active', 'deactive'].map(st => (
                          n.status === st && (
                            <span
                              key={st}
                              onClick={() => update_status(st === 'pending' ? 'active' : st === 'active' ? 'deactive' : 'active', n._id)}
                              className={`px-2 py-[2px] rounded-lg text-xs cursor-pointer ${st === 'pending'
                                ? 'bg-blue-100 text-blue-800'
                                : st === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'}`}
                            >
                              {res.loader && res.id === n._id ? 'Loading...' : n.status}
                            </span>
                          )
                        ))}
                      </>
                    ) : (
                      <span className={`px-2 py-[2px] rounded-lg text-xs ${n.status === 'pending'
                        ? 'bg-blue-100 text-blue-800'
                        : n.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'}`}>
                        {n.status}
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4 flex gap-2'>
                    <Link to={`/dashboard/news/view/${n._id}`} className='p-2 bg-green-500 rounded hover:shadow-lg text-white'>
                      <FaEye />
                    </Link>
                    <button onClick={() => deleteNews(n._id)} className='p-2 bg-red-500 rounded hover:shadow-lg text-white'>
                      <FaTrash />
                    </button>
                    {store?.userInfo.role === 'writer' && (
                      <Link to={`/dashboard/news/edit/${n._id}`} className='p-2 bg-yellow-500 rounded hover:shadow-lg text-white'>
                        <FaEdit />
                      </Link>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-end px-10 gap-x-3 text-slate-600'>
        <div className='flex gap-x-3 justify-center items-center'>
          <p className='px-4 font-semibold text-sm'>New per page</p>
          <select value={parPage} onChange={(e) => { setParPage(parseInt(e.target.value)); setPage(1) }}
            className='px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 h-10'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <p className='px-6 font-semibold text-sm'>
          {(page - 1) * parPage + 1}/{news.length} - of {pages}
        </p>
        <div className='flex items-center gap-x-3'>
          <IoIosArrowBack onClick={() => { if (page > 1) setPage(page - 1) }} className='w-5 h-5 cursor-pointer' />
          <IoIosArrowForward onClick={() => { if (page < pages) setPage(page + 1) }} className='w-5 h-5 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default NewContent
