import React, { useState } from 'react';
import logo from '../assets/JATENGUPDATES.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { base_url } from '../../config/config';

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email tidak boleh kosong");
    setLoading(true);

    try {
      const { data } = await axios.post(`${base_url}/api/forgot-password`, { email });
      toast.success(data.message || "Link reset password berhasil dikirim ke email kamu");
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className='min-w-screen min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        
        {/* Logo */}
        {/* <div className='flex justify-center mb-6'>
          <Link to="/">
            <img className='w-[200px]' src={logo} alt="logo" />
          </Link>
        </div> */}

        {/* Judul */}
        <h2 className='text-2xl font-bold text-center text-red-600 mb-4'>
          Reset Password
        </h2>
        <p className='text-sm text-gray-500 text-center mb-6'>
          Masukkan email akunmu untuk menerima link reset password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Email</label>
            <input
              type='email'
              placeholder='Masukkan email kamu'
              name='email'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className='w-full py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-all duration-300'
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>

        {/* Link kembali ke login */}
        <div className='text-center mt-6'>
          <p className="text-sm text-gray-500">
            Sudah ingat password?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
