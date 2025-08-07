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
    <div className='min-w-screen min-h-screen bg-slate-200 flex justify-center items-center'>
      <div className='w-[340px] text-slate-600 shadow-md'>
        <div className='bg-white h-full px-7 py-8 rounded-md'>
          <div className='w-full justify-center items-center flex'>
            <Link to="http://localhost:3000">
              <img className='w-[200px]' src={logo} alt="logo" />
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='Masukkan email kamu'
                name='email'
                className='px-3 py-2 rounded-md outline-0 border border-gray-300
                focus:border-green-500 h-10'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mt-4'>
              <button
                disabled={loading}
                className='px-3 py-[6px] w-full bg-red-500 rounded-md text-white hover:bg-red-600'
              >
                {loading ? "Mengirim..." : "Reset Password"}
              </button>
            </div>
            <div className='text-center mt-4'>
              <p className="text-sm text-gray-500">
                Sudah ingat password? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
