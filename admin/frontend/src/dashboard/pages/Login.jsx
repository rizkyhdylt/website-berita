import React, { useContext } from 'react'
import logo from '../assets/JATENGUPDATES.png';
import { useState } from 'react'
import { base_url } from '../../config/config';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import storeContext from '../../context/storeContext';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const Login = () => {

  const navigate = useNavigate()
  const {dispatch} = useContext(storeContext)
  const [loader, setLoader] =useState(false)

  const[state, setState] = useState ({
    email:"",
    password: ""
  })

  const inputHandle = (e)=>{
    setState({
      ...state,
      [e.target.name] : e.target.value 
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    try{
      setLoader(true)
      const {data} = await axios.post(`${base_url}/api/login`,state)
      setLoader(false)
      localStorage.setItem('newsToken', data.token)
      toast.success(data.message)
      dispatch({
        type: "login_succes",
        payload : {
          token: data.token
        }
      })
      
      window.location.href = `http://localhost:3000?token=${data.token}`;
    }catch(error){
      setLoader(false) 
      toast.error(error.response?.data?.message || 'Login gagal')
    }
  }

   const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const token = credentialResponse.credential;

    const res = await axios.post(`${base_url}/api/google-login`, {
      token
    });

    const jwt = res.data.token;

    // Simpan token
    localStorage.setItem('newsToken', jwt);

    toast.success("Login berhasil");

    dispatch({
      type: "login_succes",
      payload: {
        token: jwt
      }
    });

    // ✅ Redirect ke home menggunakan React Router
    // navigate("/", { replace: true });

    // Atau jika tetap mau pakai full redirect:
    window.location.href = `http://localhost:3000?token=${jwt}`;

  } catch (error) {
    console.error('Google Login Error:', error);
    toast.error("Login gagal");
  }
};


  

  return (
      <div className='min-w-screen min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        {/* Logo */}
        <div className='w-full flex justify-center mb-6 '>
          <Link to='http://localhost:3000'>
            <img src={logo} alt='logo' className='w-[200px]' />
          </Link>
        </div>

        {/* Form Login */}
        <form onSubmit={submit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Email</label>
            <input
              onChange={inputHandle}
              required
              value={state.email}
              type='email'
              placeholder='Masukkan email'
              name='email'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>Password</label>
            <input
              onChange={inputHandle}
              required
              value={state.password}
              type='password'
              placeholder='Masukkan password'
              name='password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
            />
          </div>

          <button
            disabled={loader}
            className='w-full py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-all duration-300'
          >
            {loader ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-6'>
          <hr className='flex-grow border-gray-300' />
          <span className='px-3 text-gray-400 text-sm'>atau</span>
          <hr className='flex-grow border-gray-300' />
        </div>

        {/* Google Login */}
        <div className='flex justify-center'>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google Login gagal')}
          />
        </div>

        {/* Links */}
        <div className='text-center mt-6 space-y-2'>
          <p className='text-sm text-gray-500'>
            Tidak punya akun?{' '}
            <Link to='/register' className='text-blue-500 hover:underline'>
              Daftar sekarang
            </Link>
          </p>
          <p className='text-sm text-gray-500'>
            <Link to='/reset-password' className='text-blue-500 hover:underline'>
              Lupa password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
