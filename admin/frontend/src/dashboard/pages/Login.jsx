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
    <div className='min-w-screen min-h-screen bg-slate-200 flex justify-center items-center'>
      <div className='w-[340px] text-slate-600 shadow-md'>
        <div className='bg-white h-full px-7 py-8 rounded-md'>
          <div className='w-full justify-center items-center flex'>
            <Link to="http://localhost:3000">
              <img className='w-[200px]' src={logo} alt="logo" />
            </Link>
          </div>
          <form onSubmit={submit} className=''>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='email'>Email</label>
              <input onChange={inputHandle} required value={state.email}  type='email' placeholder='email' name='email' className='px-3 py-2 rounded-md outline-0 border border-gray-300
              focus:border-green-500 h-10' id='email'/>
            </div>
            <div className='flex flex-col gap-y-2'>
              <div className='flex flex-col gap-y-2'>
                <label className='text-md font-medium text-gray-600' htmlFor='password'>Password</label>
                <input onChange={inputHandle} required value={state.password} type='password' placeholder='password' name='password' className='px-3 py-2 rounded-md outline-0 border border-gray-300
                focus:border-green-500 h-10' id='password'/>
              </div>
            </div>
            <div className='mt-4'>
              <button disabled={loader} className='px-3 py-[6px] w-full bg-red-500 rounded-md text-white hover:bg-red-600'>{loader ? "loading..." : 'Login'}</button>
            </div>
            <div className='mt-4 flex justify-center'>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google Login gagal")} />
            </div>
            <div className='text-center mt-4'>
              <p className="text-sm text-gray-500 mt-2">
                Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
