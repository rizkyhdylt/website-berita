import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimesCircle } from 'react-icons/fa'

const EmailVerificationFailed = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800 px-4">
       <div className="text-red-600 mb-4">
        <FaTimesCircle className="text-8xl" />
      </div>
      <div className="text-center">      
        <h1 className="text-3xl font-bold mb-2">Verifikasi Gagal</h1>
        <p className="mb-6 text-lg">
          Maaf, tautan verifikasi tidak valid atau telah kedaluwarsa.
        </p>
        <Link
          to="/login"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}

export default EmailVerificationFailed
