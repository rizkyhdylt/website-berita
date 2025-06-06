import React, { useEffect, useState } from 'react'
import { FaImage } from "react-icons/fa6"
import { base_url } from '../../config/config'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('newsToken')
      try {
        const res = await axios.get(`${base_url}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(res.data)
      } catch (err) {
        console.error("Error fetching profile:", err)
      }
    }

    fetchProfile()
  }, [])

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem('newsToken')

    try {
      const res = await axios.put(`${base_url}/api/user/change-password`, {
        old_password: oldPassword,
        new_password: newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert(res.data.message || 'Password berhasil diubah!')
      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengubah password.'
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('newsToken');

    try {
      const res = await axios.post(`${base_url}/api/uploadImage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload berhasil!');
      setUser({ ...user, image: res.data.image });
    } catch (err) {
      alert('Gagal upload gambar.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className='w-full grid grid-cols-2 gap-x-6 mt-5'>
      <div className='bg-white gap-x-3 p-6 rounded flex justify-center items-center'>
        <div>
         <label htmlFor='img' className='w-[150px] h-[150px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed overflow-hidden'>
            {selectedImage || user?.image ? (
              <img
                src={selectedImage || user.image}
                alt="Profile"
                className='object-cover w-full h-full'
              />
            ) : (
              <div className='flex justify-center items-center flex-col gap-y-2'>
                <span className='text-2xl'><FaImage /></span>
                <span>Select Image</span>
              </div>
            )}
          </label>
          <input
            className='hidden'
            type='file'
            id='img'
            onChange={handleImageUpload}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
        </div>
        <div className='text-[#404040] flex flex-col gap-y-1 items-start ml-4'>
          {user ? (
            <>
              <span>Nama  : {user.name}</span>
              <span>Email : {user.email}</span>
              <span>Role  : {user.role}</span>
            </>
          ) : (
            <span>Loading profile...</span>
          )}
        </div>
      </div>

      <div className='bg-white p-6 py-4 text-[#404040]'>
        <h2 className='pb-3 text-center'>Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className='grid grid-cols-1 gap-x-5 mb-3'>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='old_password'>Old Password</label>
              <input
                type='password'
                placeholder='Old Password'
                name='old_password'
                className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'
                id='old_password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='new_password'>New Password</label>
              <input
                type='password'
                placeholder='New Password'
                name='new_password'
                className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'
                id='new_password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='mt-4'>
            <button
              className={`px-3 py-[6px] rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-600'}`}
              disabled={loading}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
