import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { base_url } from '../../config/config'

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${base_url}/api/users`)
        console.log("Response dari API:", res.data)

        // Tangani dua kemungkinan struktur data
        const userData = Array.isArray(res.data) ? res.data : res.data.users || []
        setUsers(userData)
      } catch (err) {
        console.error("Failed to fetch users:", err)
        setUsers([])
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className='bg-white rounded-md'>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl font-medium'>User Profile</h2>
      </div>
      <div className='relative overflow-x-auto p-4'>
        <table className='w-full text-sm text-left text-slate-600'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-6 py-3'>No</th>
              <th className='px-6 py-3'>Name</th>
              <th className='px-6 py-3'>Email</th>
              <th className='px-6 py-3'>Tanggal Registrasi</th>
              <th className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id || index} className='bg-white border-b'>
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4'>{user.name}</td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4'> {new Date(user.createdAt).toLocaleDateString('id-ID')}</td>
                <td className='px-6 py-4'>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User
