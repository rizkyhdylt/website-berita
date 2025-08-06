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
    <div className='min-w-screen min-h-screen bg-slate-200 flex justify-center items-center'>
      <div className='w-[340px] text-slate-600 shadow-md'>
        <div className='bg-white h-full px-7 py-8 rounded-md'>
          <div className='w-full justify-center items-center flex'>
            <img className='w-[200px]' src={logo} alt="logo" />
          </div>
          <form onSubmit={submit}>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='name'>Name</label>
              <input type='text' placeholder='name' name='name' onChange={inputHandle} value={state.name}
                className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='name' />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='email'>Email</label>
              <input type='email' placeholder='email' name='email' onChange={inputHandle} value={state.email}
                className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='email' />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='password'>Password</label>
              <input type='password' placeholder='password' name='password' onChange={inputHandle} value={state.password}
                className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='password' />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='confirmPassword'>Confirm Password</label>
              <input type='password' placeholder='confirm password' name='confirmPassword' onChange={inputHandle} value={state.confirmPassword}
                className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='confirmPassword' />
            </div>
            <div className='mt-4'>
              <button disabled={loader} className='px-3 py-[6px] w-full bg-red-500 rounded-md text-white hover:bg-red-600'>
                {loader ? 'Loading...' : 'Register'}
              </button>
            </div>
            <div className='text-center mt-4'>
              <p className="text-sm text-gray-500 mt-2">
                Already Have An Account? <Link to="/login" className="text-blue-500 hover:underline">Sign In.</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
