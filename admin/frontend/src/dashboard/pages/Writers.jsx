import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {FaEye, FaTrash } from 'react-icons/fa'
import berita from '../assets/berita3.jpg'
import axios from 'axios'
import {base_url} from '../../config/config'
import storeContext from '../../context/storeContext'

const Writers = () => {

  const {store} = useContext(storeContext)
  const [writers, setWriters] = useState([])

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


  const handleDelete = async (id) => {
  if (confirm('Yakin ingin menghapus writer ini?')) {
    try {
      await axios.delete(`${base_url}/api/writers/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      alert('Berhasil dihapus');
      // Refresh data:
      get_writers();
    } catch (err) {
      alert('Gagal menghapus');
      console.error(err);
    }
  }
};

  useEffect(()=>{
    get_writers()
  }, [])

  return (
    <div className='bg-white rounded-md'>
      <div className=' flex justify-between p-4'>
          <h2 className='text-x1 font-medium'>Writers</h2>
          <Link className='px-3 py-[6px] bg-purple-500 rounded-md text-white
              hover:bg-purple-600' to='/dashboard/writer/add'>Add Writers</Link>
      </div>
      <div className='relative overflow-x-auto p-4'>
        <table className='w-full text-sm text-left text-slate-600'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                    <th className='px-7 py-3'>No</th>
                    <th className='px-7 py-3'>Name</th>
                    {/* <th className='px-7 py-3'>Category</th> */}
                    <th className='px-7 py-3'>Role</th>
                    <th className='px-7 py-3'>Image</th>
                    <th className='px-7 py-3'>Email</th>
                    <th className='px-7 py-3'>Active</th>
                </tr>
            </thead>
            <tbody>
                {
                 writers.map((r,i)=> <tr key={i} className='bg-white border-b'>
                  <td className='px-6 py-4'>{i+1}</td>
                  <td className='px-6 py-4'>{r.name}</td>
                  {/* <td className='px-6 py-4'>{r.category}</td> */}
                  <td className='px-6 py-4'>{r.role}</td>
                  <td className='px-6 py-4'>
                    {r.image && r.image !== "null" && r.image !== "" ? (
                      <img className='w-[40px] h-[40px] rounded-full object-cover' src={r.image} alt={r.name} />
                    ) : (
                      <div className='w-[40px] h-[40px] rounded-full bg-gray-400 text-white flex items-center justify-center text-base font-semibold'>
                        {r.name
                          .split(' ')
                          .map(word => word[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className='px-6 py-4'>{r.email}</td>
                  <td className='px-6 py-4'>
                      <div className='flex justify-start items-center gap-x-4 text-white'>
                          <Link to={`/dashboard/writer/${r._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                          <div onClick={() => handleDelete(r._id)} className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></div>                
                      </div>
                  </td>
              </tr>)
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Writers
