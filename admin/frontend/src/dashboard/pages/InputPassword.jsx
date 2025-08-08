import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const InputPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setError('Password tidak cocok')
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/reset-password/${token}`, {
        password
      })

      setMessage(res.data.message)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
    }
  }

  return (
    <div className='min-w-screen min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        {/* Header */}
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold text-red-600'>Reset Password</h2>
          <p className='text-sm text-gray-500 mt-1'>Silakan masukkan password baru Anda</p>
        </div>

        {/* Pesan error / sukses */}
        {error && <p className='bg-red-100 text-red-600 text-sm p-2 rounded-md mb-4'>{error}</p>}
        {message && <p className='bg-green-100 text-green-600 text-sm p-2 rounded-md mb-4'>{message}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Password Baru</label>
            <input
              type='password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Masukkan password baru'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Konfirmasi Password</label>
            <input
              type='password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Masukkan ulang password'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-all duration-300'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default InputPassword
