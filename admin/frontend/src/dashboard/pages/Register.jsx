import React, { useState } from 'react';
import logo from '../assets/JATENGUPDATES.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { base_url } from '../../config/config'; // pastikan path sesuai struktur project kamu

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loader, setLoader] = useState(false);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      toast.error('Password tidak cocok');
      return;
    }

    try {
      setLoader(true);
      await axios.post(`${base_url}/api/register`, {
        name: state.name,
        email: state.email,
        password: state.password,
      });
      setLoader(false);
      toast.success('Registrasi berhasil');
      navigate('/login');
    } catch (err) {
      setLoader(false);
      toast.error(err.response?.data?.message || err.message || 'Registrasi gagal');
    }
  };

  return (
    <div className='min-w-screen min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        {/* Logo */}
        <div className='flex justify-center mb-6'>
          <img src={logo} alt="logo" className='w-[200px]' />
        </div>

        {/* Form */}
        <form onSubmit={submit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Name</label>
            <input
              type='text'
              placeholder='Masukkan nama'
              name='name'
              onChange={inputHandle}
              value={state.name}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Email</label>
            <input
              type='email'
              placeholder='Masukkan email'
              name='email'
              onChange={inputHandle}
              value={state.email}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Password</label>
            <input
              type='password'
              placeholder='Masukkan password'
              name='password'
              onChange={inputHandle}
              value={state.password}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Confirm Password</label>
            <input
              type='password'
              placeholder='Konfirmasi password'
              name='confirmPassword'
              onChange={inputHandle}
              value={state.confirmPassword}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>

          <button
            disabled={loader}
            className='w-full py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-all duration-300'
          >
            {loader ? 'Loading...' : 'Register'}
          </button>
        </form>

        {/* Link ke Login */}
        <div className='text-center mt-6'>
          <p className="text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Login sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
