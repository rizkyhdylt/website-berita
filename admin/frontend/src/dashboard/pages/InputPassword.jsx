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
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-4'>Reset Password</h2>
      {error && <p className='text-red-500'>{error}</p>}
      {message && <p className='text-green-500'>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label>Password Baru</label>
          <input
            type='password'
            className='w-full border p-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label>Konfirmasi Password</label>
          <input
            type='password'
            className='w-full border p-2'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default InputPassword
